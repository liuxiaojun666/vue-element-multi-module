import { getThemeName } from './globalTheme'
import themeDefault from './themeDefault/defaultVariable'
import themeSimple from './themeSimple/simpleVariable'

const themes = {
  default: themeDefault,
  simple: themeSimple
}

export default () => {
  const theme = getThemeName()
  return themes[theme]
}
