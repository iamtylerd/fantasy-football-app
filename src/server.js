const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const axios = require('axios')
const circularJSON = require('circular-json')
const CONSTANTS = require('./CONSTANTS.js')
const { Client } = require('pg')
const client = new Client({
    user: `${CONSTANTS.DB_USERNAME}`,
    host: `${CONSTANTS.DB_HOST}`,
    database: `${CONSTANTS.DB_NAME}`,
    password: `${CONSTANTS.DB_PASSWORD}`,
    port: `${CONSTANTS.DB_PORT}`,
  })
client.connect()

app.use(express.static(path.join(__dirname, 'build')));



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