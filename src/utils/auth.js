import Cookies from 'js-cookie'

const TokenKey = 'kdsass-token'
const timeTapKey = 'kdtimetap-key'
// 可以再浏览器里面打印出来cookie的方法 get 获取参数token key
export function getToken() {
  return Cookies.get(TokenKey)
}
// 设置 cookit token的写法
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token的写法
export function removeToken() {
  return Cookies.remove(TokenKey)
}
// 获取时间戳函数
export function getTimeTap() {
  return Cookies.get(timeTapKey)
}
// 生成时间戳函数
export function setTimeTap() {
  return Cookies.set(timeTapKey, Date.now())
}
