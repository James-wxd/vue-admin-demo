import request from '@/utils/request'
// 获取所有角色列表
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * 获取公司信息
 * **/
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
/**
 * 获取角色详情
 * **/
export function getRoleDetail(id) {
  return request({
    url: `/sys/role/${id}`
  })
}
// 新增角色详情
export function addRole(data) {
  return request({
    method: 'POST',
    url: `/sys/role`,
    data
  })
}
// // /sys/role/{id}
// // 根据id 删除角色
export function delRole(id) {
  return request({
    method: 'DELETE',
    url: `/sys/role/${id}`
  })
}
// // 根据id 更新角色
export function updateRole(data) {
  return request({
    method: 'PUT',
    url: `/sys/role/${data.id}`,
    data
  })
}
