import { StopListBot } from './Components/stopListBot'

const hello = {
  id: 'hello',
  message: "Bonjour. Je suis Germaine, le robot qui t'aide à ne jamais rater ton tram ! Comment puis-je t'aider ?",
  trigger: 'actionOpt',
}

const actionOpt = {
  id: 'actionOpt',
  options: [
    { value: 1, label: 'Connaitre les horaires de mes favoris', trigger: 'otherAction' },
    { value: 2, label: 'Avoir les horaires de mon tram', trigger: 'whichStop' },
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

const whichStop = {
  id: 'whichStop',
  message: "Quel est le nom de votre arret ?",
  trigger: 'askStop'
}

const askStop = {
  id: 'askStop',
  user: true,
  trigger: '3'
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
  askStop,
  whichStop
]

export default steps;
