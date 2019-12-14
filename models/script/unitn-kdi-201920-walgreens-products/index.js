const puppeteer = require('puppeteer');
const stringSimilarity = require('string-similarity');
const pg = require('pg');
const fs = require('fs');
const process = require('process');
const _ = require('lodash');

const BASE_URL = 'https://www.walgreens.com';

class Main {
  static browser;
  static pool;

  static inLabels;
  static outStream;

  static async init () {
    this.browser = await puppeteer.launch();

    const config = {
      user: 'user',
      database: 'drugcentral',
      password: 'password',
      port: 5432,
      host: '127.0.0.1',
    };
    this.pool = new pg.Pool(config);

    let rawLabels = fs.readFileSync('labels.json');
    this.inLabels = JSON.parse(rawLabels);

    this.outStream = fs.createWriteStream(
      'out/output_' + Math.trunc((new Date()).getTime() / 1000) + '.json');

    await this.outStream.write('[\n');
  }

  static async deinit () {
    await this.browser.close();

    await this.outStream.write(']\n');
    this.outStream.end();
  }

  static async openPage () {
    const page = await this.browser.newPage();
    //page.on('console', msg => console.log('PAGE LOG:', msg.text()));
    return page;
  }

  static async sleepAsync (millis) {
    return new Promise((resolve => {
      setTimeout(() => {resolve();}, millis);
    }));
  }

  static async getLablesFromDb () {
    return new Promise((resolve, reject) => {
      this.pool.connect((err, client, done) => {
        if (err) console.error(err);

        client.query('SELECT id, title FROM label WHERE category LIKE \'HUMAN OTC DRUG LABEL\'',
          function (err, result) {
            if (err) reject(err);
            else {
              resolve(result.rows);
            }
          });
      });
    });
  }

  static async run () {
    await this.init();

    //const labels = await this.getLablesFromDb();
    const labels = this.inLabels;

    let lastTime = (new Date()).getTime();

    const ids = Object.keys(labels);

    const startIndex = 0;
    const endIndex = ids.length;

    for (let i = startIndex; i < endIndex; i++) {
      if (labels[ids[i]].category !== 'human prescription drug label') {
        const dbTitle = labels[ids[i]].title;
        const dbId = labels[ids[i]].id;

        let foundProduct = null;
        try {
          foundProduct = await this.searchProduct(dbTitle);
        } catch (err) {
          console.error(err);
        }

        if (foundProduct) {
          foundProduct.dbId = dbId;

          await this.outStream.write(JSON.stringify({
            id: foundProduct.dbId,
            product_name: foundProduct.title,
            price: foundProduct.price,
            rating: foundProduct.ratings,
            link: foundProduct.url,
          }) + ',\n');
        }

        const finishTime = (new Date()).getTime();
        if (foundProduct) {
          console.log('[' + i + '/' + ids.length + ']', foundProduct,
            (finishTime - lastTime) + 'ms');
        } else {
          console.warn('[' + i + '/' + ids.length + ']', 'NOT FOUND',
            (finishTime - lastTime) + 'ms');
        }
        lastTime = finishTime;

        await this.sleepAsync(1000);
      }
    }

    await this.deinit();
  }

  static async searchProduct (keyword) {
    const page = await this.openPage();

    const url = BASE_URL + '/search/results.jsp?Ntt=' + encodeURI(keyword);

    console.log('Opening: ' + url);
    await page.goto(url);

    const products = await page.evaluate(({ BASE_URL }) => {
      const result = [];

      const cards = document.querySelectorAll('.wag-product-cards');
      cards.forEach(function (card) {
        const product = {};
        const titleDOM = card.querySelector('.wag-prod-title > a');

        product.title = titleDOM ? Array.prototype.filter.call(titleDOM.childNodes,
          function (element) {
            return element.nodeType === Node.TEXT_NODE;
          }).map(function (element) {
          return element.textContent.trim();
        }).join('') : 'N.A.';

        const ratingDOM = card.querySelector('.wag-prod-ratings img');

        if (ratingDOM) {
          const ratingsRegex = /(\d+(\.\d+)?) out of 5, total (\d+)(\s)?reviews/g;
          const matches = ratingsRegex.exec(ratingDOM.alt);
          product.ratings = matches[1];
        } else {
          product.ratings = null;
        }
        product.url = titleDOM ? BASE_URL + titleDOM.getAttribute('href') : 'N.A.';

        const priceContainer = card.querySelector('.wag-prod-price-info');
        const priceMessage = priceContainer.querySelector('.wag-price-msg');
        const priceDOM = priceContainer.querySelector('.product__price > .product__price');

        if (priceMessage)
          product.price = priceMessage.innerText;
        else if (priceDOM) {
          product.price = Array.prototype.map.call(priceDOM.childNodes, function (element) {
            let val = null;
            switch (element.nodeType) {
              case Node.TEXT_NODE:
                val = element.textContent.trim();
                break;
              case Node.ELEMENT_NODE:
                val = element.innerText;
                break;
            }
            if (!((/^\d*$/g)).test(val))
              val = null;
            return val;
          }).filter(function (element) { return !!element; }).join('.');
        } else {
          product.price = 'N.A.';
        }
        result.push(product);
      });

      return result;
    }, { BASE_URL });

    await page.close();

    if (products && products.length > 0) {
      const productsNames = products.map(product => product.title.toLowerCase().trim());
      const similarities = stringSimilarity.findBestMatch(keyword.toLowerCase().trim(),
        productsNames);

      const selectedProduct = products[similarities.bestMatchIndex];
      selectedProduct.rating = similarities.bestMatch.rating;

      return selectedProduct;
    } else {
      return null;
    }
  }
}

process.on('SIGINT', function () {
  Main.deinit();
  console.log('bye!');
  process.exit();
});
(async () => {
  await Main.run();
})();


