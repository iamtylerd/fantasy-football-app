import React, { Component } from 'react';
import axios from "axios";
import moment from "moment";
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
        axios.all([this.getScores(), this.getWeather()])
            .then((data) => {
                this.setState({
                    games: this.buildWeather(data[0].data, data[1].data.Games),
                    weather: data[1].data.Games
                })
                this.buildWeather()
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
        return axios.get("http://localhost:5000/api/get-weather", {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
    }


    buildWeather(games, weather) {
        for (let i in games) {
            let homeTeam = games[i].schedule.homeTeam.abbreviation.substring(0,2)
            for (let k in weather) {
                if(weather[k].homeTeam.substring(0,2) == homeTeam) {
                    console.log(weather[k].homeTeam.substring(0,2), homeTeam)
                    games[i]["forecast"] = weather[k].forecast
                    games[i]["dome"] = weather[k].isDome === "1" ? weather[k].domeImg : false
                    games[i]["tvStation"] = weather[k].tvStation
                }
            }
        }
        return games
    }

    showDome(e) {
        return (
            <img src={e}  alt="Dome" title="Dome"/>
        )
    }


    render() {
        console.log(this.state)
        return (
            <div className="weather-container">
                <h1 className="games-header">Games this week</h1>
                    <Fade cascade>
                        <div className="weather-cards">
                        {
                            this.state.games.map((game, index) => {
                                return (
                                    <Card className="weather-card" key={index}>
                                        <CardContent>
                                            <Typography variant="headline" component="h2" align="center">
                                                {game.schedule.awayTeam.abbreviation} @ {game.schedule.homeTeam.abbreviation}
                                            </Typography>
                                            {game.schedule.playedStatus != "UNPLAYED" && <Typography variant="headline" component="h2" align="center">
                                                {game.score.awayScoreTotal} - {game.score.homeScoreTotal} | {game.score.currentQuarter === null ? "Final" : game.score.currentQuarter}
                                            </Typography>}
                                            {["1", "2", "3", "4"].includes(game.score.currentQuarter) && <Typography variant="headline" align="center">
                                                {game.score.currentQuarterSecondsRemaining}
                                            </Typography>}
                                            <Typography>
                                                {moment(game.schedule.startTime).format("MM-DD-YY @ hA")}
                                            </Typography>
                                            <Typography>
                                                {game.tvStation}
                                            </Typography>
                                            <Typography>
                                                Forecast: {game.forecast}
                                            </Typography>
                                            <Typography align="right" color="textSecondary" className="isDome">
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