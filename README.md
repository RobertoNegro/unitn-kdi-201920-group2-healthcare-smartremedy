# smartRemedy - A support for basic healthcare needs

KDI Lab 2019-20 - Università degli Studi di Trento

Group 2 - Healthcare domain


**Informal-to-Formal subgroup**

Martina Maffei, Matteo Proch, Riccardo Scandino\*, Stefania Mattevi


**Data Integration subgroup**

Alberto Bellumat, Matteo Zanoni, Roberto Negro\*\*


_\*subgroup leader_

_\*\*subgroup and project leader_


### / folder

*report.KDI.Lab-2019-20.pdf* is the report of our project.

*presentation.pdf* is the Power Point used during the presentation of our project.

### /informal-model folder

*er.graphml.xml* is the file to be opened in yEd containing our ER model.

*er.png* is the image of the ER model exported by yEd.

### /formal-model folder

*ontology.owl* is our ontology to be opened in Protégé

*ontology\_schema\_org.owl* is the result of the top-level grounding of our ontology integrating the classes from the Schema.org ontology.

### /models folder

*r2rml folder* contains the Karma Model exported directly from Karma in all the available formats (.json-model.dot, .json-model.json, .json-model.md, .json-model.ttl).

*script folder* contains all the scripts used for preparing the data. The description of each script is available in the next chapter.

### /data folder

*alldata.json* is the final dataset that you will upload into karma, and on which you apply the karma model for generating the final RDF file.

*drugs\_general\_dataset.json* is a dataset that contains all the drugs (with and without prescription) that we gather from drugcentral.

*farmacie.json* is a dataset that contains all the information (location, pictures, etc.) regarding the drugstores in Trentino that we scraped from the website farmaciediturno.org, OpenStreetMap (for the coordinates) and Google Images (for the photos).

*farmacie\_selling\_drugs.json* is a dataset that we created in order to reperesent the assumption that all drugstores (that we gathered in *farmacie.json*) sells all the drugs (that we gathered in *drus\_general\_dataset.json*)

*sito\_web\_dataset.json* is a dataset that contains the drugs without prescription sold by Walmart. It contains the reviews of the website and the drugs as well.

*drugcentral.txt* contains the indications on how to download the DrugCentral database dump that we've used.

*linked.data.ttl* is the RDF output generated from Karma.



# Scripts

## unitn-kdi-201920-data-selection

All of this scripts are used to cleverly reduce the data but mantaining links between active ingredients, products, sympthoms, etc. All of this scripts read data from a postgresql database in localhost called "prova", which contains the dump of the DrugCentral database.


### sintomi\.py

This script selects all needed data from sympthoms by selecting manually 13 of the most common diseases and 20 more random ones. It saves all this data in json format in a file called sintomi.json.


This script requires python 3.7 or grater with the following libraries:

+ Pandas

+ SQLAlchemy

+ psycopg2


### ingredienti\_attivi\.py

This script selects all needed data from active ingredients, it reads sympthoms from the sintomi.json file and searches for a maximum of 100 active ingredients curing each sympthom. It saves all this data in json format in a file called ingredienti\_attivi.json.


This script requires python 3.7 or grater with the following libraries:

+ Pandas

+ SQLAlchemy

+ psycopg2


### prodotti\.py

This script selects all needed data from products, it reads active ingredients from the ingredienti\_attivi.json file and searches for all products containing those active ingredients. It saves all this data in json format in a file called prodotti.json. This script also reads back all the active ingredients in the selected roducts and saves them in the ingredienti\_attivi.json file.


This script requires python 3.7 or grater with the following libraries:

+ Pandas

+ SQLAlchemy

+ psycopg2


### labels\.py

This script selects all needed data from product labels, it reads products from the prodotti.json file and searches the label of each product. It saves all this data in json format in a file called labels.json.


This script requires python 3.7 or grater with the following libraries:

+ Pandas

+ SQLAlchemy

+ psycopg2


## unitn-kdi-201920-drugcentral-db-to-json

### index.js

NodeJS script used in order to create a JSON file containing the list of drugs with all the related information, even those that are inferred by relationships (as the leaflet, active ingredients, and so on).


This script requires NodeJS 12.11 or grater.


## unitn-kdi-201920-walgreens-products

### index.js

NodeJS script used to scrape the products from the Walgreens' webstore. It uses a PostgreSQL connection to the DrugCentral database because initially we were scraping all the drugs that are present in the database. In the end, instead, we've filtered the drugs and picked only a small subset of them, and so we've adapted the scraper to read from the labels.json (from the unitn-kdi-201920-data-selection\labels.py script) the name of the products. The results are saved in the file out/output\_[timestamp].json.


This script requires NodeJS 12.11 or grater with the following libraries:

+ csv-writer

+ lodash

+ pg

+ puppeteer

+ string-similarity


## unitn-kdi-201920-walmart-prices

### walmart\.py

This scraper gets as input a json file **lables.json**. It simulates a chrome session, navigates to **walmart.com** and for each product in the input file it searches it on the site. If it finds a match it reads form the page the full name, price, rating and the link to buy the product.


This script requires python 3.7 or grater with the following libraries:

+ BeautifoulSoup

+ Pandas

+ Selenium

+ Numpy


### clean\_data\.py

This is a small script to clean the output data from walmart.py it drops useless columns and removes unfound records.


This script requires python 3.7 or grater with the following libraries:

+ Pandas


## unitn-kdi-201920-local-pharma-openings

### main.py

Python script that scrapes farmaciediturno.org in order to obtain the timestamps of the openings of the local drugstores for all the Trentino-Alto Adige region. The latitude and longitude coordinates are obtained by OpenStreetMap API. When new addresses are found, the translated coordinates obtained by the API are saved in the cache.json file.


This script requires python 3.7 or grater with the following libraries:

+ GeoPy

+ BeautifulSoup


## google-image-scraper

### imageScraping.py

Is a python scraper script for the scraping of images (that is their source links, format, etc.) obtained through google image search.


This script requires python 3.7 or grater with the following library:

+ google-images-download


## medinify-develop

### reviewsScrapingDrug.py

Is a pythong scraper script for the scraping of the reviews of drugs, from the websites webmd and everydayhealth. It's based on another GitHub project called [Medinify](https://github.com/NLPatVCU/medinify).


This script requires python 3.7 or grater with the following libraries:

+ Pandas

+ Scrapy


## reviewsScrapeWebsiteTrustpilot

### reviewsScrape.py

Is a pythong scraper script for the scraping of reviews for websites, from the trustpilot website.


This script requires python 3.7 or grater with the following libraries:

+ BeautifulSoup

+ Pandas


## polishing

### join.py 

Is the python script which merge the dataset files drugs\_general\_dataset.json, farmacie.json, farmacie\_selling\_drugs.json and sito\_web\_dataset.json into the file alldata.json. You need to apply the script finishing.py after.


### finishing.py

Adds uuid in the file alldata.json for the MaximumDoseSchedule class. Finally, you output the file alldata.json (which is the exactly same alldata.json in the /data folder).


### Manual retouches

The files obtained from the python scrapers went through a lot of processes of changing, and the JSON files you see in the folder /data are the results of said processes. Unfortanetly some small changes were made manually or by some very small scripts that were lost in the process.
