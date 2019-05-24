const initialState = "1"

export const changeTab = (state = initialState, action) => {
  switch(action.type) {
    case CHANGE_TAB:
      return action.tab
    default:
      return state
  }
}

const CHANGE_TAB  = 'CHANGE_TAB'
export const changeTabAction = (tab) => {
  return({
    type: CHANGE_TAB, tab: tab
  })
}


export default changeTab
