import React, { Component } from 'react';
import { render } from 'react-dom';
import './style.css';
import { Horaires } from './Components/horaires';
import { Carte } from './Components/carte';
import { Bot } from './Components/bot.js';
import { Layout, Menu } from 'antd';
import { Provider } from 'react-redux';
import Store from './Store/configureStore'


const { Header, Content, Footer } = Layout;

//differents modes availables

//'line-list'

//'stop-list'

//'schedule'

class App extends Component {
  constructor() {
    super()
    this.state = {
      tabs: 1
    }
  }

  changeTabs = (tabs) => {
    this.setState({
      tabs: tabs
    })
  }



  render() {
    return (
      <Provider store={Store}>
        <Layout className="layout">


          <Header>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['1']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1" onClick={() => this.changeTabs(1)}>Horaires</Menu.Item>
              <Menu.Item key="2" onClick={() => this.changeTabs(2)}>Carte</Menu.Item>

            </Menu>
          </Header>



          <Content style={{ padding: '0', backgroundColor: 'white'}}>
            {this.state.tabs === 1 ? <Horaires /> : false}
            {this.state.tabs === 2 ? <Carte /> : false}
          </Content>

          <Footer style={{ textAlign: 'center' }}>
            E-TAG ©2019 Created by Paulien
          </Footer>

          <Bot />

        </Layout>
      </Provider>
    )
  }
}

render(<App />, document.getElementById('root'));
