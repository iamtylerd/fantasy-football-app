const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();
const axios = require('axios')
const circularJSON = require('circular-json')
const CONSTANTS = require('./CONSTANTS.js')
const MySportsFeeds = require("mysportsfeeds-node");
const msf = new MySportsFeeds("2.0", true);
let helperFunctions = require("./helperFunctions")
msf.authenticate(`${CONSTANTS.MSF_API_KEY}`, "MYSPORTSFEEDS");
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

app.get("/api/get-weather", (req, res, err) => {
    axios.get(`https://www.fantasyfootballnerd.com/service/weather/json/${CONSTANTS.API_KEY}`)
        .then((data) => {
            res.send(circularJSON.stringify(data.data))
        })
})

app.get("/api/get-current-scores", (req, res, err) => {
    let nflWeek = helperFunctions.determineNflWeek()
    console.log(nflWeek)
    axios.get(`https://api.mysportsfeeds.com/v2.0/pull/nfl/current/week/${nflWeek}/games.json`, {
        headers: {
            Authorization: CONSTANTS.MSF_API_KEY
        }
    })
    .then((data) => {
        res.send(circularJSON.stringify(data.data["games"]))
    })
})

app.get("/api/weekly-stats", (req, res, err) => {
    axios.get("https://api.mysportsfeeds.com/v2.0/pull/nfl/players.json", {
        headers: {
            Authorization: CONSTANTS.MSF_API_KEY
        }
    })
    .then((data) => {
        console.log(data)
            res.send(circularJSON.stringify(data))
    })
    .catch((err) => {
        console.log("err", err)
    })
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 5000);