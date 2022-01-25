import { AnyAction } from 'redux'

import ThemeColors from '../../models/ThemeColors'
import { Themes } from '../../utils/constants'

const initialState = {
  background: ThemeColors.LIGHT_BACKGROUND,
  color: ThemeColors.LIGHT_TEXT_COLOR,
}

const theme = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case Themes.SET_LiGHT_THEME:
      return {
        ...state,
        ...action.payload,
      }
    case Themes.SET_DARK_THEME:
      return {
        ...state,
        ...action.payload,
      }
    default:
      return state
  }
}

export default theme
