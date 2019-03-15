import React, { Component } from 'react';
import '../style.css';
import { getStopByLine } from '../API/APITag';
import { connect } from 'react-redux'
import chooseLineAction from '../Store/Reducers/reducer'
import chooseStopAction from '../Store/Reducers/reducer'
import { changeTabAction } from '../Store/Reducers/reducer'

class StopList extends Component {
  constructor() {
    super()
    this.state = {
      stop: {}
    }
  }

  _getAllStopByLineId = (lineId) => {
    getStopByLine(lineId).then(data => {
      this.setState({ stop: data[0].arrets })
    })
  }

  componentDidMount() {
    this._getAllStopByLineId(this.props.lineId)
  }

  render() {
    return(
      <div id="stop-list">
        <h1>Tous les arrets de la ligne</h1>
        { Object.keys(this.state.stop).map(x => <Stop stop={this.state.stop[x]} key={this.state.stop[x].stopId} />) }
      </div>
    )
  }
}

const Stop = (props) => {
  return(
    <div>
      <p>{ props.stop.parentStation.name } ({ props.stop.stopId })</p>
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

const connectedStopList = connect(mapStateToProps, mapDispatchToProps)(StopList)
export { connectedStopList as StopList }
