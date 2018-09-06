const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const axios = require('axios')
const circularJSON = require('circular-json')
const pgp = require('pg-promise')(/*options*/)
const CONSTANTS = require('./CONSTANTS.js')
const db = pgp(`postgres://${CONSTANTS.DB_USERNAME}:${CONSTANTS.DB_PASSWORD}@127.0.0.1:5432/postgres`)
app.use(express.static(path.join(__dirname, 'build')));

db.one('SELECT $1 AS value', 123)
  .then(function (data) {
    console.log('DATA:', data.value)
  })
  .catch(function (error) {
    console.log('ERROR:', error)
  })

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Request-Headers", "*")
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/api/weekly-projections', (req, res, err) => {
    axios.get(`https://www.fantasyfootballnerd.com/service/weekly-rankings/json/${CONSTANTS.API_KEY}/RB/1/1`)
        .then((data) => {
            res.send(circularJSON.stringify(data.data))
        })
})

app.get('/api/weekly-projections-query', (req, res, err) => {
    axios.get(`https://www.fantasyfootballnerd.com/service/weekly-rankings/json/${CONSTANTS.API_KEY}/${req.query.position}/${req.query.week}/1`)
        .then((data) => {
            res.send(circularJSON.stringify(data.data))
        })
})

app.get("/api/weather", (req, res, err) => {
    axios.get(`https://www.fantasyfootballnerd.com/service/weather/json/${CONSTANTS.API_KEY}`)
        .then((data) => {
            res.send(circularJSON.stringify(data.data))
        })
})

app.get("/api/get-current-scores", (req, res, err) => {
    axios.get("http://www.nfl.com/liveupdate/scores/scores.json")
        .then((data) => {
            res.send(circularJSON.stringify(data.data))
        })
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 5000);