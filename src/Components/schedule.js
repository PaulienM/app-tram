import React, { Component } from 'react';
import '../style.css';
import { getScheduleByStop } from '../API/APITag';
import { sort } from '../algorithm.js';
import { Icon } from 'antd';
import { connect } from 'react-redux'
import chooseLineAction from '../Store/Reducers/reducer'
import chooseStopAction from '../Store/Reducers/reducer'
import { changeTabAction } from '../Store/Reducers/reducer'

class ScheduleList extends Component {
  constructor() {
    super()
    this.state = {
      schedules: {},
      schedulesList: [],
      isLoaded: false
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
    this._loadSchedule(this.props.stopId)
  }

  render() {
    if(!this.state.isLoaded) {
      return (
        <div style={{ textAlign: 'center', margin: '4em'}} >
          <Icon type="loading"/>
        </div>
      )
    } else {
      return (
        <div id="schedule-list">
          <h1>Temps d'arrivée</h1>
          <h2>Direction : { this.state.schedules[0].pattern.desc }</h2>
          {this.state.schedulesList.map(x => <Schedule schedule={x} key={x.tripId}/>)}
        </div>
      )
    }
  }
}

const Schedule = (props) => {
  return(
    <div>
      <p>{props.schedule.formattedTime}</p>
    </div>
  )
}

const mapStateToProps = (state) => ({line: state.line, stop: state.stop, tab: state.tab})

const mapDispatchToProps = (dispatch) => {
    return({
        chooseNewLine: function(line) {
          dispatch(chooseLineAction(line))
        },
        chooseNewStop: function(stop) {
          dispatch(chooseStopAction(stop))
        },
        changeTabs: function(tab) {
          dispatch(changeTabAction(tab))
        }
    })
}

const connectedScheduleList = connect(mapStateToProps, mapDispatchToProps)(ScheduleList)
export { connectedScheduleList as ScheduleList }
