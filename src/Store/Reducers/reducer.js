const initialState = {
   tab: "1",
   line: {},
   stop: {}
 }

export const selectParams = (state = initialState, action) => {
  console.log(action)
  let nextState = {...state}
  switch(action.type) {
    case CHOOSE_LINE:
      nextState.line = action.line
      return nextState
    case CHOOSE_STOP:
      nextState.stop = action.stop
      return nextState
    case CHANGE_TAB:
      nextState.tab = action.tab
      return nextState
    default:
      return state
  }
}

const CHOOSE_LINE = 'CHOOSE_LINE'
const CHOOSE_STOP = 'CHOOSE_STOP'
const CHANGE_TAB  = 'CHANGE_TAB'

export const chooseLineAction = (line) => {
  return({
    type: CHOOSE_LINE, line: line
  })
}


export const chooseStopAction = (stop) => {
  return({
    type: CHOOSE_STOP, stop: stop
  })
}


export const changeTabAction = (tab) => {
  return({
    type: CHANGE_TAB, tab: tab
  })
}


export default selectParams


//React-Redux
/*
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
}*/

/*
const Provider = ReactRedux.Provider;
const connect = ReactRedux.connect;

// define the Container component here:
const Container = connect(mapStateToProps, mapDispatchToProps)(Presentational)

class AppWrapper extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // complete the return statement:
    return (
      <Provider store={store}>
        <Container />
      </Provider>
    );
  }
};
*/
