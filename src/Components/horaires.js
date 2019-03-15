import React, { Component } from 'react';
import '../style.css';
import { LinesList } from './linesList';
import { StopList } from './stopList.js';
import { ScheduleList } from './schedule.js';
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import chooseLineAction from '../Store/Reducers/reducer'
import chooseStopAction from '../Store/Reducers/reducer'
import { changeTabAction } from '../Store/Reducers/reducer'

const TabPane = Tabs.TabPane;

class Horaires extends Component {
  constructor(){
    super()
    this.state = {
      mode: 'line-list',
      lineId: 'SEM:A',
      stopId: 'SEM:2014',
      activeKey: '1'
    }
  }

  onChange = (activeKey) => {
    this.props.changeTabs(activeKey)
  }

  render() {
    console.log(this.props.tab)
    return (
      <Tabs activeKey={this.props.tab} onChange={this.onChange}>

        <TabPane tab="Choix de la ligne" key="1">
          <LinesList/>
        </TabPane>

        { this.state.lineId === undefined
          ? <TabPane tab="Choix de l'arret" disabled key="2">
            </TabPane>
          : <TabPane tab="Choix de l'arret" key="2">
              <StopList lineId={ this.state.lineId } />
            </TabPane>
        }

        { this.state.stopId === undefined || this.state.lineId === undefined
          ? <TabPane tab="Horaires" disabled key="3">
              </TabPane>
          : <TabPane tab="Horaires" key="3">
              <ScheduleList lineId={ this.state.lineId } stopId={ this.state.stopId }/>
            </TabPane>
        }

      </Tabs>
    )
  }
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

const connectedHoraires = connect(mapStateToProps, mapDispatchToProps)(Horaires)
export { connectedHoraires as Horaires }
