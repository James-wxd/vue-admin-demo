// 导入静态路由
import { constantRoutes } from '@/router/index'
import { asyncRoutes } from '@/router'
const state = {
  router: constantRoutes
}
const mutations = {
  setRouter(state, newRouter) {
    state.router = [...constantRoutes, ...newRouter]
  }

}
const actions = {
  addRouters(context, menus) {
    // console.log('77777777777777777777777777777777777')
    const routes = []
    menus.forEach(key => {
    //   const asyncRoute = asyncRoutes.filter(item => item.children[0].name === key)
      const asyncRoute = asyncRoutes.filter(function(res) {
        return res.children[0].name === key
      })
      routes.push(...asyncRoute)
    })
    // console.log(routes, '22222222222222222222222222222')
    context.commit('setRouter', routes)
    // 因为动态路由要使用这个值 所以要return出来
    return routes
  }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions
}
