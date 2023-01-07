// 通过es6的写法导入我们需要的cookie设置方法
import { getToken, setToken, removeToken, setTimeTap } from '@/utils/auth'
// 导入axios封装的函数
import { getUserInfo, login, getUserDetails } from '@/api/user'
import { resetRouter } from '@/router/index'
// 使用vuex 和前端缓存相结合
export default {
  namespaced: true,
  state: {
    token: getToken(), // 用过数据可持久话放到vuex 里面
    userInfo: {} // 定义我们需要存储的用户信息
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      // vuex和缓存同步
      setToken(token)
    },
    removeToken(state, token) {
      state.token = null // 删除vuex的token
      removeToken(token) // 删除我们cookie定义的token
    },
    // 创建用户信息函数
    setUserInfo(state, userInfo) {
      // 进行浅拷贝 复制我们需要的对象 使用的是扩展运算符
      state.userInfo = { ...userInfo }
    },
    // 删除用户信息函数
    removeUserInfo(state) {
      state.userInfo = {}
    }

  },
  actions: {
    // 异步处理我们需要的函数
    async login(context, data) {
      const result = await login(data) // await 后面实际上会返回一个promis对象
      console.log(result)
      //  因为我们使用了 axios 相应拦截器 所以在我们拿到response的时候我们进行了 响应数据的过滤操作
      //  判断我们的token已经成功了那么我们需要做处理token操作了
      // 调用mutation方法进行token创建
      // request 相应拦截器 过滤data操作 所以这里的result就是data
      context.commit('setToken', result)
      // 创建当前时间戳
      setTimeTap()
    },
    // 获取用户资料action
    async getuserInfo(context) {
      // 通过async 和 await 获取异步请求任务
      const result = await getUserInfo()
      // 获取用户的基本信息
      const baseInfo = await getUserDetails(result.userId)
      // 合并两个对象
      const baseResult = { ...result, ...baseInfo }
      console.log(baseInfo, 'baseInfo')
      console.log(result, 'getuserinfo')
      context.commit('setUserInfo', baseResult)
      return baseResult
    },
    //  实现用户登出功能
    logout(context) {
      // 清楚token，并且清除用户信息
      context.commit('removeToken')
      context.commit('removeUserInfo')
      // 这里我们应该让路由重置
      resetRouter()
      // 同时也要把vuex的数据给清空掉
      context.commit('permission/setRoutes', [], { root: true })
      // 子模块调用子模块的action 可以 将 commit的第三个参数 设置成  { root: true } 就表示当前的context不是子模块了 而是父模块
    }

  }
}

