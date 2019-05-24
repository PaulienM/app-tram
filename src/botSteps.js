import React, { Component } from 'react';
import PropTypes from 'prop-types';

const hello = {
  id: 'hello',
  message: "Bonjour. Je suis Germaine, le robot qui t'aide à ne jamais rater ton tram ! Comment puis-je t'aider ?",
  trigger: 'actionOpt',
}

const actionOpt = {
  id: 'actionOpt',
  options: [
    { value: 1, label: 'Connaitre les horaires de mes favoris', trigger: 'otherAction' },
    { value: 2, label: 'Avoir les horaires de mon tram', trigger: 'whichLine' },
    { value: 3, label: 'Gérer mes favoris', trigger: '3' },
  ],
}

const otherAction = {
  id: 'otherAction',
  message: "As tu besoin d'autre chose ?",
  trigger: 'otherActionOpt',
}

const otherActionOpt = {
  id: 'otherActionOpt',
  options: [
    { value: 1, label: "Non, merci", trigger: 'goodbye'},
    { value: 2, label: "Oui", trigger: 'newHello'},
  ],
}

const goodbye = {
  id: 'goodbye',
  message: "D'accord, bonne journée",
  trigger: 'needYouOpt',
}

const needYouOpt = {
  id: 'needYouOpt',
  options: [
    { value: 1, label: "J'ai besoin de vous !", trigger: 'newHello'},
  ],
}

const newHello = {
  id: 'newHello',
  message: "Pas de problèmes. Robot Germaine à votre service.",
  trigger: 'actionOpt',
}

const whichLine = {
  id: 'whichLine',
  message: "De quel ligne souhaitez vous connaitre les horaires ?",
  trigger: 'askLine'
}

const askLine = {
  id: 'askLine',
  user: true,
  trigger: 'whichStop'
}

const whichStop = {
  id: 'whichStop',
  message: "Quel est le nom de votre arret ?",
  trigger: 'askStop'
}

const askStop = {
  id: 'askStop',
  user: true,
  trigger: 'horaires'
}

const horaires = {
  id: 'horaires',
  component: <Horaires/>,
  asMessage: true,
  trigger: 'otherAction'
}


export const steps = [
  hello,
  actionOpt,
  {
    id: '3',
    message: "Voici les horaires : Tram A à Hubert Dubedout en direction de Denis Papin : A l'approche. Le suivant est dans 3min",
    trigger: 'otherAction',
  },
  otherAction,
  otherActionOpt,
  goodbye,
  needYouOpt,
  newHello,
  askLine,
  whichLine,
  askStop,
  whichStop,
  horaires
]

export default steps;

class Horaires extends Component {
  constructor() {
    super()
    this.state = {
      line: '',
      stop: ''
    }
  }

  /*componentWillMount() {
    const { steps } = this.props;
    const { askLine, askStop } = steps;

    this.setState({ askLine, askStop });
  }*/

  render() {
    /*const { askLine, askStop } = this.state;
    console.log(this.state.askLine.value)
    console.log(this.state.askStop.value)*/
    return(
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
      </div>
    )
  }
}


Horaires.propTypes = {
  steps: PropTypes.object,
};

Horaires.defaultProps = {
  steps: undefined,
};
