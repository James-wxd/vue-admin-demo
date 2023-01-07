// 导入layout组件
import layout from '@/layout'
export default {
  path: '/approvals',
  component: layout,
  children: [{
    name: 'approvals',
    path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/approvals'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: {
      title: '审批', // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon: 'el-icon-s-grid'
    //   <svg-icon icon-class="table" />
    // <svg-icon icon-class="edit" />
    // <i class="el-icon-edit-outline" />
    // <i class="el-icon-s-grid" />
    }
  }, {
    path: 'salaryApproval/:id',
    component: () => import('@/views/approvals/salary'),
    name: 'salaryApproval',
    hidden: true,
    meta: {
      title: '工资审核',
      icon: 'approval', noCache: true }
  },
  {
    path: 'enterApproval/:id',
    component: () => import('@/views/approvals/enter'),
    name: 'enterApproval',
    hidden: true,
    meta: {
      title: '入职审核',
      icon: 'approval', noCache: true }
  },
  {
    path: 'leaveApproval/:id',
    component: () => import('@/views/approvals/leave'),
    name: 'leaveApproval',
    hidden: true,
    meta: {
      title: '申请请假',
      icon: 'approval', noCache: true }
  },
  {
    path: 'quitApproval/:id',
    component: () => import('@/views/approvals/quit'),
    name: 'quitApproval',
    hidden: true,
    meta: {
      title: '申请离职',
      icon: 'approval', noCache: true }
  },
  {
    path: 'overtimeApproval/:id',
    component: () => import('@/views/approvals/overtime'),
    name: 'overtimeApproval',
    hidden: true,
    meta: {
      title: '加班申请',
      icon: 'approval', noCache: true }
  },
  {
    path: 'securitySetting',
    component: () => import('@/views/approvals/security'),
    name: 'securitySetting',
    hidden: true,
    meta: {
      title: '设置',
      icon: 'approval', noCache: true }
  }
  ]
}
