import { combineReducers } from 'redux'

import theme from './theme'

const rootReducer = combineReducers({
  theme,
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
