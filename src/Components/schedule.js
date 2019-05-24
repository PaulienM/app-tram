import React, { Component } from 'react';
import '../style.css';
import { getScheduleByStop } from '../API/APITag';
import { sort } from '../algorithm.js';
import { connect } from 'react-redux'

class ScheduleList extends Component {
  constructor() {
    super()
    this.state = {
      schedulesList: []
    }
  }

  _loadSchedule = (stopId) => {
    getScheduleByStop(stopId).then(data => {
      this.setState({ schedules: data },
      () => {this._getScheculeList(this.state.schedules)})
    })
  }

  _getScheculeList = (schedulesObj) => {
    let schedulesArr = []
    for(let element of schedulesObj) {
      for(let time of element.times) {
        schedulesArr.push(time)
      }
    }
    schedulesArr = sort(schedulesArr,'realtimeArrival')
    this.setState({
      isLoaded: true,
      schedulesList: schedulesArr
    }, () => {
      this._formatTime()
    })
  }

  _formatTime = () => {
    let newSchedulesList = []
    for(let i = 0; i < this.state.schedulesList.length; i ++) {
      let scheduleTimeStamp = (this.state.schedulesList[i].realtimeArrival + this.state.schedulesList[i].serviceDay) * 1000
      let timeStamp = Math.floor(Date.now());
      let formattedTime = ""
      if(scheduleTimeStamp - timeStamp > 30 * 60 * 1000) {
        let date = new Date(scheduleTimeStamp)
        let hours = date.getHours()
        let minutes = "0" + date.getMinutes()
        formattedTime = hours + ':' + minutes.substr(-2)
      } else if (scheduleTimeStamp - timeStamp > 60 * 1000){
        let date = new Date(scheduleTimeStamp - timeStamp)
        let minutes = "0" + date.getMinutes()
        formattedTime = minutes.substr(-2) + "min"
      } else {
        formattedTime = "A l'approche"
      }
      newSchedulesList.push(this.state.schedulesList[i])
      newSchedulesList[i].formattedTime = formattedTime
    }
    this.setState({
      schedulesList: newSchedulesList
    })
  }

  componentDidMount() {
    this._getScheculeList(this.props.schedules)
  }

  render() {
    return (
      <div id="schedule-list">
        <h1>Temps d'arrivée</h1>
        {this.props.schedules.filter(x => x.pattern.id.indexOf(this.props.line) !== -1).map(schedules => {
          return(
            <>
              <h2>Direction : { schedules.pattern.desc }</h2>
              {schedules.times.map(x => <Schedule schedule={x.formattedTime} key={x.tripId}/>)}
            </>
        )})}


      </div>
    )
  }
}

const Schedule = (props) => {
  return(
    <div>
      <p>{props.schedule}</p>
    </div>
  )
}

const mapStateToProps = (state) => ({schedules: state.API.schedules, line: state.API.line})

const connectedScheduleList = connect(mapStateToProps, null)(ScheduleList)
export { connectedScheduleList as ScheduleList }
