import { createStore } from 'redux'
import selectParams from './Reducers/reducer'

const Store = createStore(selectParams)

export default Store;
