import request from '@/utils/request'
// 导出组织架构模块
export function getDeparments() {
  return request({
    method: 'GET',
    url: '/company/department'
  })
}
// 删除部门导出函数
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
/**
 *  新增部门接口
 *
 * ****/
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'post',
    data
  })
}
