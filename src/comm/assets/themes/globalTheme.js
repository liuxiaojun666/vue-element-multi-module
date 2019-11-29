import { getStore, setStore } from '@comm/tools/store'

export const getThemeName = () => {
  try {
    const store = localStorage.getItem('moduleStore')
    return JSON.parse(store).theme.name || 'default'
  } catch (error) {
    return getStore('theme').name || 'default'
  }
}

export const themeNames = ['default', 'simple']

export const changeTheme = window.changeTheme = (theme = getThemeName(), callback = () => { }) => {
  let success
  if (!themeNames.includes(theme)) {
    success = false
    return callback(success)
  }
  setStore('theme', { name: theme })
  document.documentElement.dataset.theme = theme
  success = true
  return callback(success)
}
