require("dotenv").config()
let apiKey = process.env.API_KEY

const deepl = require("deepl-node")

const translator = new deepl.Translator(apiKey);

(async () => {
    const result = await translator.translateText('Hello World!', null, 'tr');
    console.log(result.text); //Merhaba Dünya!
})();
