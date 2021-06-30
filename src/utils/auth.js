import Cookies from 'js-cookie'

const TokenKey = 'accessToken'
const RefreshKey = 'refreshToken'
const UserIDKey = 'userID'

// export function setToken(token) {
//   return Cookies.set(TokenKey, token)
// }

export function setToken(token) {
  localStorage.setItem(TokenKey, token)
  // return Cookies.set(TokenKey, token)
}

export function setRefreshToken(token) {
  localStorage.setItem(RefreshKey, token)
}
export function setUserID(userID) {
  localStorage.setItem(UserIDKey, userID)
}
export function getRefreshToken() {
  return Cookies.get(RefreshKey)
}
export function getToken() {
  return localStorage.getItem(TokenKey)
}

export function getUserID() {
  return localStorage.getItem(UserIDKey)
}

export function removeToken() {
  localStorage.removeItem(RefreshKey)
  localStorage.removeItem(TokenKey)
}
