import Cookies from 'js-cookie'

const TokenKey = 'kdsass-token'
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
