import request from '@/utils/request'
// 使用axios封装登录接口，返回一个axios对象 promise
export function login(data) {
  return request({
    method: 'post',
    url: '/sys/login',
    data
  })
}
// 创建获取用户信息函数
export function getUserInfo() {
  return request({
    method: 'post',
    url: '/sys/profile'
  })
}
// 创建获取员工的基本信息
// /sys/user/{id}
export function getUserDetails(id) {
  return request({
    method: 'GET',
    url: `/sys/user/${id}`
  })
}
export function logout() {
}
/** *
 *  获取某个用户的基本信息
 *
 * ***/
export function getUserDetailById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
/** *
 *
 * 保存员工的基本信息
 * **/
export function saveUserDetailById(data) {
  return request({
    url: `/sys/user/${data.id}`,
    method: 'put',
    data
  })
}

