import React, { Component } from 'react';
import axios from "axios";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Fade from 'react-reveal/Fade';

import "./Games.scss"

class Games extends Component {
    constructor(props) {
        super(props)
        this.state = {
            games: []
        }
    }

    componentDidMount() {
        axios.all([this.getWeather(), this.getScores()]).then((data) => {
            this.addScorestoGames(data[0].data.Games, data[1].data)
            this.setState({
                games: data[0].data.Games,
                scores: data[1].data
            })
        })
    }

    getScores(){
        return axios.get("http://localhost:5000/api/get-current-scores", {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
    }

    getWeather(){
        return axios.get("http://localhost:5000/api/weather", {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
    }

    addScorestoGames(games, scores) {
        for (let i in scores) {
            let homeTeam = scores[i].home.abbr
            if(games.hasOwnProperty(homeTeam)) {
                //myString is a key on the Object, but not its prototype.
                console.log(games[homeTeam], scores[i]);
            }
        }
    }

    buildWeather() {
        let games = []
        for(let g in this.state.games) {
            let date =this.state.games[g].gameDate.split("-")
            let formattedDate = `${date[1]}-${date[2]}-${date[0]}`
            let formatted = {
                away: this.state.games[g].awayTeam,
                home: g,
                date: formattedDate,
                time: this.state.games[g].gameTimeET,
                forecast: this.state.games[g].forecast,
                tvStation: this.state.games[g].tvStation,
                dome: this.state.games[g].isDome === "1" ? this.state.games[g].domeImg : false
            }
            games.push(formatted)
        }
        return games
    }

    showDome(e) {
        return (
            <img src={e}  alt="Dome" title="Dome"/>
        )
    }

    render() {
        return (
            <div className="weather-container">
                <h1 className="games-header">Games this week</h1>
                    <Fade cascade>
                        <div className="weather-cards">
                        {
                            this.buildWeather().map((game, index) => {
                                return (
                                    <Card className="weather-card" key={index}>
                                        <CardContent>
                                            <Typography variant="headline" component="h2" align="center">
                                                {game.away} @ {game.home}
                                            </Typography>
                                            <Typography>
                                                {game.date} @ {game.time} EST
                                            </Typography>
                                            <Typography variant="subheading">
                                                Forecast: {game.forecast}
                                            </Typography>
                                            <Typography color="textSecondary">
                                                {game.tvStation}
                                            </Typography>
                                            <Typography align="right" color="textSecondary">
                                                {game.dome !== false ? this.showDome(game.dome) : null}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                )
                            })
                        }
                        </div>
                    </Fade>
            </div>
        )
    }
}

export default Games