import React, { Component } from 'react';
import '../style.css';
import { connect } from 'react-redux'
import { asyncCallStop } from '../Store/Reducers/callAPI'
import { changeTabAction } from '../Store/Reducers/changeTab'
import Store from '../Store/configureStore'

class StopList extends Component {
  render() {
    return(
      <div id="stop-list">
        <h1>Tous les arrets de la ligne</h1>
        { Object.keys(this.props.stop).map(x => <ConnectedStop stop={this.props.stop[x]} key={this.props.stop[x].stopId} />) }
      </div>
    )
  }
}

class Stop extends Component {
  render() {
    return(
      <div onClick={() => {
        Store.dispatch(asyncCallStop(this.props.stop.stopId))
        this.props.changeTabs("3")
      }}>
        <p>{ this.props.stop.parentStation.name } ({ this.props.stop.stopId })</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({stop: state.API.stopList[0].arrets})

const mapDispatchToProps = (dispatch) => {
    return({
        changeTabs: function(tab) {
          dispatch(changeTabAction(tab))
        }
    })
}

const ConnectedStop = connect(null, mapDispatchToProps)(Stop)
const ConnectedStopList = connect(mapStateToProps, mapDispatchToProps)(StopList)
export { ConnectedStopList as StopList }
