import request from '@/utils/request'
// 使用axios封装登录接口，返回一个axios对象 promise
export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}

export function getuserInfo() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}

export function logout() {
}
