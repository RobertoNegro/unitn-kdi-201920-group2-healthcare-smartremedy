const puppeteer = require('puppeteer');
const pg = require('pg');
const fs = require('fs');

class Main {
  static browser;
  static pool;

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

    this.client = await this.connectToDb();
  }

  static async deinit () {
    await this.browser.close();
  }

  static async connectToDb () {
    return new Promise((resolve, reject) => {
      this.pool.connect((err, client, done) => {
        if (err) reject(err);
        resolve(client);
      });
    });
  }

  static async getLablesFromDb () {
    return new Promise((resolve, reject) => {
      this.client.query('SELECT id, title FROM label WHERE category LIKE \'HUMAN OTC DRUG LABEL\'',
        function (err, result) {
          if (err) reject(err);
          else {
            resolve(result.rows);
          }
        });
    });
  }

  static async getDDIs (id) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT AI.id, AI2.id, DDI.ddi_risk, DDI.description\n' +
        'FROM active_ingredient as AI\n' +
        'INNER JOIN struct2drgclass as S2C ON AI.struct_id = S2C.struct_id\n' +
        'INNER JOIN drug_class as C ON S2C.drug_class_id = C.id\n' +
        'INNER JOIN ddi as DDI on C.name = DDI.drug_class1\n' +
        'INNER JOIN drug_class as C2 ON C2.name = DDI.drug_class2\n' +
        'INNER JOIN struct2drgclass as S2C2 ON S2C2.drug_class_id = C2.id\n' +
        'INNER JOIN active_ingredient AS AI2 ON AI2.struct_id = S2C2.struct_id\n' +
        'WHERE AI.id = ' + id + '\n' +
        'AND AI2.id IN (3087757,3183388,3148389,3171354,3156351,3156352,3183027,3183028,3208050,3067239,3155731,3155732,3155733,3210642,3210643,3210644,3134130,3134131,3161303,3193762,3193763,3193764,3193765,3141611,3141612,3141613,3141614,3141615,3141616,3141617,3141618,3173760,3173761,3173762,3157938,3157939,3195710,3195711,3195712,3199214,3199215,3208339,3208340,3149757,3149758,3149759,3133229,3133230,3133231,3133232,3197706,3197707,3201221,3201222,3201223,3161325,3161326,3193231,3193232,3193233,3131368,3131369,3181764,3181765,3181766,3187301,3187302,3187303,3197309,3197310,3197311,3196899,3196900,3196901,3175400,3175401,3175402,3133515,3133516,3133517,3133518,3133519,3133520,3138344,3138345,3138346,3138347,3138348,3138349,3138350,3202512,3202513,3132834,3132835,3132836,3192634,3192635,3192636,3176604,3176605,3176606,3161967,3161968,3133346,3133347,3133348,3142323,3142324,3142325,3200714,3200715,3200716,3200717,3154476,3154477,3185689,3185690,3183147,3183148,3183149,3183150,3064203,3059434,3065009,3084165,3084166,3103571,3058453,3057973,3058778,3082478,3082479,3085037,3085038,3085864,3116668,3116669,3061849,3117450,3058139,3085994,3085995,3058736,3115455,3087828,3111117,3110388,3122723,3066853,3066854,3076684,3089848,3096608,3115035,3097260,3102418,3126793,3126794,3111208,3111209,3114263,3114264,3117512,3117513,3111341,3111342,3091980,3091981,3105339,3105340,3084290,3084291,3116920,3116921,3209909,3130106,3111577,3121243,3078213,3109246,3060829,3065127,3065128,3071940,3071941,3082819,3124202,3124203,3065208,3065209,3065210,3065211,3099028,3099029,3099030,3058042,3106268,3111854,3111855,3058064,3058741,3062430,3102271,3066238,3066239,3080688,3063858,3072410,3079033,3079034,3117181,3061479,3074995,3074996,3080009,3089108,3108707,3068905,3076576,3094995,3090839,3110378,3073034,3067718,3128192,3058005,3061284,3111829,3111830,3111832,3111833,3088506,3074809,3078243,3078244,3078245,3074376,3074377,3074378,3070373,3091719,3091720,3086001,3086002,3086003,3089617,3089618,3064147,3064148,3064149,3070367,3109601,3109602,3109603,3111514,3068528,3068529,3068530,3176119,3176120,3176121,3065849,3065850,3065851,3091703,3091704,3058600,3068888,3071664,3125613,3100896,3084307,3071976,3115022,3115023,3097661,3122115,3122116,3122117,3169577,3182477,3165203,3165204,3190190,3131349,3098031,3098032,3098033,3098034,3130259,3130260,3196534,3146684,3146685,3146686,3146687,3146688,3146689,3146690,3202103,3135215,3135216,3135217,3135218,3135219,3135220,3135222,3135223,3135224,3135225,3135226,3070661,3070662,3146562,3146563,3060568,3060569,3060570,3198549,3198550,3198551,3198553,3198554,3190193,3198764,3198765,3203144,3203145,3140421,3140422,3108716,3108717,3108718,3108719,3108720,3147596,3147597,3115731,3115732,3065779,3065780,3124199,3172376,3172377,3172378,3172379,3172380,3172381,3172382,3172384,3172385,3172386,3172387,3172388,3172389,3172390,3204976,3183551,3113207,3113208,3103174,3103175,3103176,3103177,3162091,3162092,3162093,3162094,3092756,3092757,3074966,3074967,3074304,3074305,3074307,3136455,3136456,3136457,3136458,3152405,3152406,3189223,3189224,3171767,3171768,3156647,3156648,3156649,3156650,3156651,3156652,3156653,3156654,3156655,3167399,3167400,3212105,3212106,3212107,3212109,3212110,3212111,3212112,3212113,3212114,3212115,3065139,3117138,3117139,3103342,3059555,3071621,3084930,3123308,3098765,3120444,3120445,3058219,3095461,3095017,3208065,3093257,3207944,3092192,3092193,3081178,3081179,3188712,3146017,3146018,3213409,3165679,3174190,3174191,3204649,3204650,3135098,3191913,3170805,3170806,3101481,3102039,3119236,3119237,3114447,3064200,3064201,3122420,3122421,3085290,3085291,3098941,3098942,3083127,3067670,3067671,3095356,3195725,3195726,3173972,3173973,3173974,3173975,3173976,3173977,3159070,3159071,3159072,3159073,3173834,3194342,3194343,3194344,3194345,3144945,3144946,3162189,3162190,3162191,3162192,3208882,3208883,3208884,3187900,3187901,3187902,3187903,3137612,3137613,3162061,3162062,3207165,3207166,3207167,3207168,3169962,3169963,3169964,3171516,3171517,3171518,3171519,3171520,3167039,3167040,3167041,3167042,3141929,3141930,3145778,3145779,3145780,3145781,3145782,3189864,3189865,3189866,3177432,3177433,3177434,3177435,3195661,3195662,3195663,3195664,3168152,3168153,3168154,3156219,3156220,3156221,3166135,3166136,3187719,3187720,3135806,3135807,3135808,3135809,3192373,3192374,3192375,3157554,3157555,3157556,3142245,3142246,3142247,3170160,3170161,3170162,3208093,3208094,3208095,3198008,3198009,3154951,3154952,3154953,3154954,3154955,3135341,3135342,3135343,3207650,3207651,3207652,3187473,3187474,3187475,3187476,3210106,3210107,3210108,3210109,3210110,3058019,3083933,3127048,3127049,3059604,3059605,3088299,3078471,3096374,3096375,3059175,3059176,3127423,3065430)\n';

      this.client.query(query,
        function (err, result) {
          if (err) reject(err);
          else {
            resolve(result.rows);
          }
        });
    });
  }

  static async getDrug (id) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT P.ndc_product_code as uuid, P.route as administration_route, P.form as dosage_form, P.marketing_status as is_available_generally, P.product_name as name_drug, P.generic_name as description_drug, AI.id as active_ingredient, L.assigned_entity as proprietary_name, L.category as has_prescription, C.name as category\n' +
        'FROM product as P \n' +
        'INNER JOIN prd2label as P2L on P2L.ndc_product_code = P.ndc_product_code \n' +
        'INNER JOIN label as L on L.id = P2L.label_id \n' +
        'INNER JOIN active_ingredient as AI on AI.ndc_product_code = P.ndc_product_code\n' +
        'INNER JOIN structures as S on S.id = AI.struct_id\n' +
        'INNER JOIN struct2drgclass as S2C on S2C.struct_id = S.id\n' +
        'INNER JOIN drug_class as C on S2C.drug_class_id = C.id\n' +
        'WHERE P.ndc_product_code LIKE \'' + id + '\'';

      this.client.query(query,
        function (err, result) {
          if (err) reject(err);
          else {
            resolve(result.rows[0]);
          }
        });
    });
  }

  static async getLeaflet (id) {
    return new Promise((resolve, reject) => {
      let query = 'SELECT S.title as leaflet_section, S.text as leaflet_text\n' +
        'FROM prd2label as P2L \n' +
        'INNER JOIN label as L on L.id = P2L.label_id\n' +
        'INNER JOIN section as S on S.label_id = L.id\n' +
        'WHERE P2L.ndc_product_code LIKE \'' + id + '\'';

      this.client.query(query,
        function (err, result) {
          if (err) reject(err);
          else {
            resolve(result.rows);
          }
        });
    });
  }

  static async mergeIngredientiAttivi () {
    const ingredienti_attivi = JSON.parse(fs.readFileSync('ingredienti_attivi.json', 'utf8'));
    const result = [];
    for (let i = 0; i < ingredienti_attivi.length; i++) {
      const ddis = await this.getDDIs(ingredienti_attivi[i].id);
      result.push({
        ...ingredienti_attivi[i],
        interactions: ddis,
      });
    }

    fs.writeFileSync('merged_ingredienti_attivi.json', JSON.stringify(result));
  }

  static async mergeDrugs () {
    const prodotti = JSON.parse(fs.readFileSync('prodotti.json', 'utf8'));
    const result = [];
    for (let i = 0; i < prodotti.length; i++) {
      const drug = await this.getDrug(prodotti[i].id);
      if(!drug) continue;

      const available = drug.is_available_generally.toLowerCase().includes('otc') ||
        drug.is_available_generally.toLowerCase().includes('nda') ||
        drug.is_available_generally.toLowerCase().includes('anda');

      const prescription = drug.has_prescription.toUpperCase().
        includes('HUMAN PRESCRIPTION DRUG LABEL');

      let descriptionDrug = null;
      let warning = null;
      let indication = null;
      let interaction = null;
      let contraindication = null;
      let dosage = null;
      let howSupplied = null;
      let adverseReaction = null;

      const leaflet = await this.getLeaflet(prodotti[i].id);
      for (let i = 0; i < leaflet.length; i++) {
        const l = leaflet[i];
        switch (l.leaflet_section) {
          case 'INDICATIONS & USAGE SECTION':
            indication = l.leaflet_text;
            break;
          case 'DOSAGE & ADMINISTRATION SECTION':
            dosage = l.leaflet_text;
            break;
          case 'HOW SUPPLIED SECTION':
            howSupplied = l.leaflet_text;
            break;
          case 'ADVERSE REACTIONS SECTION':
            adverseReaction = l.leaflet_text;
            break;
          case 'DESCRIPTION SECTION':
            descriptionDrug = l.leaflet_text;
            break;
          case 'WARNINGS AND PRECAUTIONS SECTION':
            warning = l.leaflet_text;
            break;
          case 'DRUG INTERACTIONS SECTION':
            interaction = l.leaflet_text;
            break;
          case 'CONTRAINDICATIONS SECTION':
            contraindication = l.leaflet_text;
            break;
        }
      }

      result.push({
        uuid: drug.uuid,
        administrationRoute: drug.administration_route,
        dosageForm: drug.dosage_form,
        isAvailableGenerally: available,
        nameDrug: drug.name_drug,
        proprietaryName: drug.proprietary_name,
        hasPrescription: prescription,
        descriptionDrug: indication,
        warning: warning,
        contraindication: contraindication,
        howSupplied: howSupplied,
        adverseReaction: adverseReaction,
        drugClass: drug.category,
        maximumDoseSchedule: dosage,
        activeIngredient: drug.active_ingredient
      });
    }

    console.log(result);

    fs.writeFileSync('merged_drugs.json', JSON.stringify(result));
  }

  static async run () {
    await this.init();

    const drug = [];
    const drugDrugInteraction = [];
    const maximumDoseSchedule = [];
    const costDrug = [];

    this.mergeDrugs();

    await this.deinit();
  }
}

(async () => {
  await Main.run();
})();
