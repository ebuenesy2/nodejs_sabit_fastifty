'use strict'
const dayjs = require('dayjs'); // ! Zaman
const dotenv = require('dotenv'); // ! env
dotenv.config(); // ! env
const sign = require('jwt-encode'); //! Token - Encode
const jwt_decode = require('jwt-decode'); //! Token - Decode
const Fastify = require('fastify'); //! Fastify
const app = Fastify({
    logger: true,
    pluginTimeout: 10000
}); //! Fastify


/*************  Web  ********************************************* */

// ! Get işlemleri
app.get("/", async (req, res) => {

    //api
    res.send({
        title: 'Anasayfa Get - api - fastify',
        status: 1,
        tryCount: 1,
        data: 'data'
    });

    //console
    console.log('\u001b[' + 32 + 'm' + 'Anasayfa Get [ / ]' + '\u001b[0m')

    //son
}) //! get

// ! Post
app.post("/", async (req, res) => {

    //name
    const name = req.body.name;

    //api
    res.send({
        title: 'Anasayfa Post',
        status: 1,
        name: name,
        data: req.body
    });

    //console
    console.log('\u001b[' + 32 + 'm' + 'Anasayfa Post' + '\u001b[0m')

}) //! Post


//! Env
app.get('/env', function (req, res) {
    res.send({
        title: 'Env Bilgileri',
        PORT: process.env.PORT,
        API: {
            APi_URL: process.env.APi_URL,
            APi_URL_Dev: process.env.APi_URL_Dev,
            APi_URL_Local: process.env.APi_URL_Local,
            APi_Title: process.env.APi_Title,
            APi_Name: process.env.APi_Name
        },
        Version: {
            Version: process.env.Version,
            Release_Date: process.env.Release_Date,
            Version_Title: process.env.Version_Title,
            Author: process.env.Author
        }

    });

    console.log('\u001b[' + 32 + 'm' + 'Env Bilgileri [ /env ] ' + '\u001b[0m');
}) //! End Env


//! Version
app.get('/version', function (req, res) {
    res.send({
        title: 'Verison Bilgileri',
        Version: process.env.Version,
        Release_Date: process.env.Release_Date,
        Version_Title: process.env.Version_Title,
        Author: process.env.Author
    });

    console.log('\u001b[' + 32 + 'm' + 'Verison Bilgileri [ /version ] ' + '\u001b[0m');

}) //! Version Son


//! Bilgiler
app.get('/info', function (req, res) {
    res.send({
        title: 'Proje Bilgileri',
        PORT: process.env.PORT,
        API: {
            APi_URL: process.env.APi_URL,
            APi_URL_Dev: process.env.APi_URL_Dev,
            APi_URL_Local: process.env.APi_URL_Local,
            APi_Title: process.env.APi_Title,
            APi_Name: process.env.APi_Name
        },
        Version: {
            Version: process.env.Version,
            Release_Date: process.env.Release_Date,
            Version_Title: process.env.Version_Title,
            Author: process.env.Author
        }

    });

    console.log('\u001b[' + 32 + 'm' + 'Proje Bilgileri [ /info ] ' + '\u001b[0m');

}) //! End Bilgiler


//! Html
app.get('/html', function (req, res) {

    console.log('\u001b[' + 32 + 'm' + 'Proje Bilgileri [ /info ] ' + '\u001b[0m');

    res.send(`<html>
          <body>
              <h1>Hello API ebu enes!</h1>
              <img src="/api/file.image" />
          </body>
          </html>
  `);

}) //! End Html

//************************************* Token  **************************************************** */	

// ! Token Oluşturma
app.post('/token', function (req, res) {

    const secret = process.env.TokenSecret;
    const data = req.body;
    const jwt = sign(data, secret);
    res.send({
        Token: jwt
    });

}) // ! Token Oluşturma	

//! Token Çözme
app.post('/token_post', function (req, res) {

    const token = req.body.token;
    const decoded = jwt_decode(token);

    res.send(decoded)

}) //! Token Çözme



//************************************* Server  **************************************************** */
// Start listening.
app.listen(process.env.PORT || 3002, '0.0.0.0', (err) => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }

    console.log('\u001b[' + 32 + 'm' + 'Port Listening [ ' + process.env.PORT + ' ]' + '\u001b[0m');
})