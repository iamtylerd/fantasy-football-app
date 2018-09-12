import React, { Component } from 'react';
import './WeeklyStats.scss';
import axios from 'axios';
import Select from 'react-select'
import {Bar} from 'react-chartjs-2';


class WeeklyStats extends Component {
  constructor(props) {
    super(props)
    this.state = {
      players: [],
      position: {value:"RB", label: "RB"},
      loading: true,
      week: {value: 1, label: 1},
      weeks: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17],
      positions: ["QB", "RB", "TE", "WR"],
      data: {
        labels: [],
        datasets: [{
          data: [],
          label: "PPR"
        }]
      }
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/weekly-stats', {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((data) => {
        console.log(data)
      })
  }


  

//   getChartData() {
//     let data = {
//       labels: [],
//       datasets: [{
//         data: [],
//         label: "PPR",
//         backgroundColor: 'rgba(255,99,132,0.2)',
//         borderColor: 'rgba(255,99,132,1)',
//         borderWidth: 1,
//         hoverBackgroundColor: 'rgba(255,99,132,0.4)',
//         hoverBorderColor: 'rgba(255,99,132,1)'
//       }]
//     }
//     this.state.players.Rankings.forEach((player) => {
//       data.datasets[0].data.push(player.ppr)
//       data.labels.push(player.name)
//     })
//     this.setState({
//       data: data
//     })
//   }

  

  render() {
    if(this.state.loading === true) {
      return (
        <h1>Loading....</h1>
      )
    }
    const options = {
      scales: {
          yAxes: [{
              ticks: {
                  beginAtZero: true,
                  min: 0
              }
          }]
      }
    }
    return (
      <div className="WeeklyStats">
        <h1 className="header-weekly-stats">Weekly Stats</h1>
         
      </div>
    );
  }
}

export default WeeklyStats;