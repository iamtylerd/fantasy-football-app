import React, { Component } from 'react';
import './WeeklyProjections.scss';
import axios from 'axios';
import Select from 'react-select'
import {Bar} from 'react-chartjs-2';
import Button from '@material-ui/core/Button';


class WeeklyProjections extends Component {
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
    this.onSelectChange = this.onSelectChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  componentDidMount() {
    axios.get(`http://localhost:5000/api/weekly-projections`, {
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    })
      .then((data) => {
        this.setState({
          players: data.data,
          loading: false
        }, () => {
          this.getChartData()
        })
      })
  }


  onSelectChange(e, name) {
    this.setState({
      [name]: e
    });
  }

  getChartData() {
    let data = {
      labels: [],
      datasets: [{
        data: [],
        label: "PPR",
        backgroundColor: 'rgba(87, 90, 75, 1)',
        borderColor: 'rgba(0,0,0,.5)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(45, 48, 71, 1)',
        hoverBorderColor: 'rgba(0,0,0,.5)'
      }]
    }
    this.state.players.Rankings.forEach((player) => {
      data.datasets[0].data.push(player.ppr)
      data.labels.push(player.name)
    })
    this.setState({
      data: data
    })
  }

  onSubmit() {
    axios.get('http://localhost:5000/api/weekly-projections-query', {
      params: {
        position: this.state.position.value,
        week: this.state.week.value
      },
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    }).then((data) => {
       this.setState({
          players: data.data,
          loading: false
        }, () => {
          this.getChartData()
        })
    })
  }


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
      <div className="WeeklyProjections">
        <h1 className="header-weekly">Weekly Projections</h1>
          <div className="select-container">
            <div className="week-select">
              <label>
                Select Week
              </label>
              <Select
                name="week-select"
                value={this.state.week}
                autoload={false}
                onChange={(e) => this.onSelectChange(e, "week")}
                searchable={true}
                options={
                    this.state.weeks.map((week) => { return {value: week, label: week}})
                }
              />
            </div>
            <div className="position-select">
              <label>
                Select Position
              </label>
              <Select
                name="position-select"
                value={this.state.position}
                autoload={false}
                onChange={(e) => this.onSelectChange(e, "position")}
                searchable={true}
                options={
                    this.state.positions.map((position) => { return {value: position, label: position}})
                }
              />
            </div>
              <Button className="search-button" variant="contained" onClick={this.onSubmit}>Search</Button>
          </div>
        <div className="bar-chart">
          <Bar data={this.state.data} options={options}/>
        </div>
      </div>
    );
  }
}

export default WeeklyProjections;