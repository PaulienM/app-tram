import React, { Component } from 'react';
import '../style.css';
import { LinesList } from './linesList';
import { StopList } from './stopList';
import { ScheduleList } from './schedule';
import { Loading } from './Loading';
import { Tabs } from 'antd';
import { connect } from 'react-redux'
import { changeTabAction } from '../Store/Reducers/changeTab'

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
    return (
      <Tabs activeKey={this.props.tab} onChange={this.onChange}>

        <TabPane tab="Choix de la ligne" key="1">
          <LinesList/>
        </TabPane>

        { this.props.API.line === undefined
          ? <TabPane tab="Choix de l'arret" disabled key="2">
            </TabPane>
          : <TabPane tab="Choix de l'arret" key="2">
              { this.props.API.stopLoading ? <Loading/> : <StopList lineId={ this.state.lineId } /> }
            </TabPane>
        }

        { this.props.API.line === undefined || this.props.API.stop === undefined
          ? <TabPane tab="Horaires" disabled key="3">
              </TabPane>
          : <TabPane tab="Horaires" key="3">
              { this.props.API.schedulesLoading ? <Loading/> : <ScheduleList lineId={ this.state.lineId } stopId={ this.state.stopId }/> }
            </TabPane>
        }

      </Tabs>
    )
  }
}

const mapStateToProps = (state) => ({tab: state.tabs, API: state.API})

const mapDispatchToProps = (dispatch) => {
    return({
        changeTabs: function(tab) {
          dispatch(changeTabAction(tab))
        }
    })
}

const connectedHoraires = connect(mapStateToProps, mapDispatchToProps)(Horaires)
export { connectedHoraires as Horaires }
