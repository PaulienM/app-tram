import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';
import '../style.css';
import { ThemeProvider } from 'styled-components';
import steps from '../botSteps.js'

/*const theme = {
  headerBgColor: '#3fb9eb',
  headerFontColor: '#FFF',
  fontFamily: 'Montserrat'
}*/

const theme = {
  background: '#f5f8fb',
  fontFamily: 'Montserrat',
  headerBgColor: '#3fb9eb',
  headerFontColor: '#fff',
  botBubbleColor: '#3fb9eb',
  botFontColor: '#fff',
  userBubbleColor: '#fff',
  userFontColor: '#4a4a4a',
};

//const floatingStyle = { background: '#3fb9eb' }



export class Bot extends Component {
  constructor() {
    super();
    this.state = {
    };
  }

  render() {
    return (
      <ThemeProvider theme={theme}>
        <ChatBot
          headerTitle="Germaine"
          className="chatbot"
          //floatingStyle={floatingStyle}
          steps={steps}
          floating="true"
        />
      </ThemeProvider>
    );
  }
}

export default Bot
