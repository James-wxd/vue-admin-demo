// 导入layout组件
import layout from '@/layout'
export default {
  path: '/salarys',
  component: layout,
  children: [{
    name: 'salarys',
    path: '', // 这里当二级路由的path什么都不写的时候 表示该路由为当前二级路由的默认路由
    component: () => import('@/views/salarys'),
    // 路由元信息  其实就是存储数据的对象 我们可以在这里放置一些信息
    meta: {
      title: '工资', // meta属性的里面的属性 随意定义 但是这里为什么要用title呢， 因为左侧导航会读取我们的路由里的meta里面的title作为显示菜单名称
      icon: 'el-icon-money'
    //   <i class="el-icon-money" />
    }
  },
  {
    path: 'setting',
    component: () => import('@/views/salarys/setting'),
    name: 'salarysSetting',
    hidden: true,
    meta: {
      title: '设置'
    }
  },
  {
    path: 'details/:yearMonth/:id',
    component: () => import('@/views/salarys/detail'),
    name: 'salarysDetails',
    hidden: true,
    meta: {
      title: '详情'
    }
  },
  {
    path: 'historicalArchiving',
    component: () => import('@/views/salarys/historical'),
    name: 'salarysHistorical',
    hidden: true,
    meta: {
      title: '历史归档'
    }
  },
  {
    path: 'monthStatement',
    component: () => import('@/views/salarys/month'),
    name: 'salarysMonthStatement',
    hidden: true,
    meta: {
      title: '月报表'
    }
  }
  ]
}
