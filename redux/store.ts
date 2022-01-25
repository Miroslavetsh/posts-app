import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from './reducers'

const composeEnhancers = compose
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk, logger)))

export default store
