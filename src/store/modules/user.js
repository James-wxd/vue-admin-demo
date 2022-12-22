// 通过es6的写法导入我们需要的cookie设置方法
import { getToken, setToken, removeToken } from '@/utils/auth'
// 导入axios封装的函数
import { login } from '@/api/user'
// 使用vuex 和前端缓存相结合
export default {
  namespaced: true,
  state: {
    token: getToken() // 用过数据可持久话放到vuex 里面
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
    }
  },
  actions: {
    // 异步处理我们需要的函数
    async login(context, data) {
      const result = await login(data) // await 后面实际上会返回一个promis对象
      console.log(result)
      if (result.data.success) {
      //  判断我们的token已经成功了那么我们需要做处理token操作了
        // 调用mutation方法进行token创建
        context.commit('setToken', result.data.data)
      }
    }
  }
}

