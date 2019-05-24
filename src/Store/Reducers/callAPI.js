import { getStopByLine } from '../API/APITag'
import { getScheduleByStop } from '../API/APITag'

const initialState = {
  line: undefined,
  stopList: undefined,
  stop: undefined,
  schedulesLoading: false,
  stopLoading: false,
  schedules: undefined
}

export function asyncCallLine(line) {
  return function(dispatch) {
    dispatch(makeRequestForStop())
    getStopByLine(line.id)
      .then(res => dispatch(receivedStop(line.id,res)))
      .catch((error) => console.log(error))
  }
}

export function asyncCallStop(stop) {
  return function(dispatch) {
    dispatch(makeRequestForSchedules())
    getScheduleByStop(stop)
      .then(res => dispatch(receivedSchedules(stop,res)))
      .catch((error) => console.log(error))
  }
}

export const callAPI = (state = initialState, action) => {
  let nextState = {...state}
  switch(action.type) {
    case RECEIVED_STOP:
      nextState.line = action.line
      nextState.stopList = action.stopList
      nextState.stopLoading = false
      return nextState
    case RECEIVED_SCHEDULES:
      nextState.schedules = action.schedules
      nextState.schedulesLoading = false
      return nextState
    case REQUESTING_STOP:
      nextState.line = {}
      nextState.stopLoading = true
      return nextState
    case REQUESTING_SCHEDULES:
      nextState.stop = {}
      nextState.schedulesLoading = true
      return nextState
    default:
      return state
  }
}


const REQUESTING_STOP = 'REQUESTING_STOP'
export const makeRequestForStop = () => {
  return({
    type: REQUESTING_STOP
  })
}
const RECEIVED_STOP = 'RECEIVED_STOP'
export const receivedStop = (line, stopList) => {
  return({
    type: RECEIVED_STOP, line: line, stopList: stopList
  })
}


const REQUESTING_SCHEDULES = 'REQUESTING_SCHEDULES'
export const makeRequestForSchedules = () => {
  return({
    type: REQUESTING_SCHEDULES
  })
}
const RECEIVED_SCHEDULES = 'RECEIVED_SCHEDULES'
export const receivedSchedules = (stop,schedules) => {
  return({
    type: RECEIVED_SCHEDULES, stop: stop, schedules: schedules
  })
}



export default callAPI
