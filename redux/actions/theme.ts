import ThemeColors from '../../models/ThemeColors'
import { Themes } from '../../utils/constants'

export const setLightTheme = () => {
  return {
    type: Themes.SET_LiGHT_THEME,
    payload: {
      background: ThemeColors.LIGHT_BACKGROUND,
      color: ThemeColors.LIGHT_TEXT_COLOR,
    },
  }
}

export const setDarkTheme = () => {
  return {
    type: Themes.SET_DARK_THEME,
    payload: {
      background: ThemeColors.DARK_BACKGROUND,
      color: ThemeColors.DARK_TEXT_COLOR,
    },
  }
}
