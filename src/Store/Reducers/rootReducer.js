import { callAPI } from './callAPI'
import { changeTab } from './changeTab'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
  API: callAPI,
  tabs : changeTab
})

export default rootReducer;
