import React, { Component } from 'react';
import '../style.css';
import { getAllLines } from '../API/APITag';
import { sort } from '../algorithm.js';
import { Icon, Button, Checkbox } from 'antd';
import 'antd/dist/antd.css';
import { connect } from 'react-redux'
import chooseLineAction from '../Store/Reducers/reducer'
import chooseStopAction from '../Store/Reducers/reducer'
import { changeTabAction } from '../Store/Reducers/reducer'


export class LinesList extends Component {
  constructor() {
    super();
    this.state = {
      tram: [],
      chrono: [],
      proximo: [],
      flexo: [],
      deselectedTypes: [],
      collapsed: true
    };
  }

  componentDidMount() {
    this._loadLines();
  }

  _loadLines = () => {
    getAllLines().then(data => {
      this.setState({
        tram: sort(data.filter(line => line.type === 'TRAM'),'id'),
        chrono: sort(data.filter(line => line.type === 'CHRONO'),'id'),
        proximo: sort(data.filter(line => line.type === 'PROXIMO'),'id'),
        flexo: sort(data.filter(line => line.type === 'FLEXO'),'id')
      })
    })
  }

  _filterLines = (filter) => {
    let index = this.state.deselectedTypes.indexOf(filter)
    if(index !== -1) {
      let newDeselectedTypes = this.state.deselectedTypes
      newDeselectedTypes.splice(index,1)
      this.setState({
        deselectedTypes: newDeselectedTypes
      })
    } else {
      let newDeselectedTypes = this.state.deselectedTypes
      newDeselectedTypes.push(filter)
      this.setState({
        deselectedTypes: newDeselectedTypes
      })
    }
  }



  render() {
    return (
      <div>
        <h1>
          Voici la liste des lignes :
        </h1>
        <div id="filter">
          <h2>
            Lignes à afficher :
          </h2>
          <label><Checkbox type="checkbox" onChange={() => this._filterLines('TRAM')} defaultChecked/> Tram  </label>
          <label><Checkbox type="checkbox" onChange={() => this._filterLines('CHRONO')} defaultChecked/> Chrono  </label>
          <label><Checkbox type="checkbox" onChange={() => this._filterLines('PROXIMO')} defaultChecked/> Proximo  </label>
          <label><Checkbox type="checkbox" onChange={() => this._filterLines('FLEXO')} defaultChecked/> Flexo  </label>
        </div>
        { (this.state.deselectedTypes.indexOf('TRAM') === -1) ? <LinesByType type="TRAM" lines={this.state.tram}/> : false}
        { (this.state.deselectedTypes.indexOf('CHRONO') === -1) ? <LinesByType type="CHRONO" lines={this.state.chrono}/> : false}
        { (this.state.deselectedTypes.indexOf('PROXIMO') === -1) ? <LinesByType type="PROXIMO" lines={this.state.proximo}/> : false}
        { (this.state.deselectedTypes.indexOf('FLEXO') === -1) ? <LinesByType type="FLEXO" lines={this.state.flexo}/> : false}
      </div>
    );
    /*return (
      <div style={{ width: 256 }}>
        <Menu
          onClick={this.handleClick}
          style={{ width: 256 }}
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          inlineCollapsed={false}
        >
          <SubMenu key="sub1" title={<span><Icon type="appstore" /><span> Tram</span></span>}>
            { this.state.tram.map(line => <Line line={line} key={line.id} props={this.props}/> )}
          </SubMenu>
          <SubMenu key="sub2" title={<span><Icon type="appstore" /><span>Chrono</span></span>}>
            { this.state.chrono.map(line => <Line line={line} key={line.id} props={this.props}/> )}
          </SubMenu>
          <SubMenu key="sub3" title={<span><Icon type="setting" /><span>Proximo</span></span>}>
            { this.state.proximo.map(line => <Line line={line} key={line.id} props={this.props}/> )}
          </SubMenu>
          <SubMenu key="sub4" title={<span><Icon type="setting" /><span>Flexo</span></span>}>
            { this.state.flexo.map(line => <Line line={line} key={line.id} props={this.props}/> )}
          </SubMenu>
        </Menu>
      </div>
    )*/
  }
}

const LinesByType = (props) => {
  return (
    <div className="line-list">
      <h2>{props.type}</h2>
      { props.lines.map(line => <Line line={line} key={line.id} /> )}
    </div>
  )
}

class Line extends Component {
  render(){
    return (
      <Button
        style={{ backgroundColor: "#"+this.props.line.color,
        color: "#"+this.props.line.textColor }}
        onClick={this.props.chooseNewLine(this.props.line)}
      >
        {this.props.line.shortName}
      </Button>
    );
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

const connectedLine = connect(null, mapDispatchToProps)(Line)
export default LinesList
