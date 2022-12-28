import store from '@/store'
import axios from 'axios'
// 导入message 模块进行处理数据
import { Message } from 'element-ui'
// 导入进度条插件
// import nProgress from 'nprogress'
// // 导入样式
// import 'nprogress/nprogress.css' // 引入进度条样式
import { getTimeTap } from '@/utils/auth'
import router from '@/router'
const timeout = 3600
// 创建一个axios 实例
const service = axios.create({
//  配置公共的请求接口
// 当我们运行npm run dev 之后那么process 对象的env.vue的值为/api
// 线上地址为prod-api
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use(function(config) {
  // nProgress.start()
  // 因为获取用户资料我们需要请求headers 对象里面添加请求头 token 所以我们需要在请求拦截器里面做处理

  if (store.getters.token) {
    console.log('123')
    // 在这里我们需要判断token 是否失效
    if (isCheckTimeTap()) {
      // 如果超过时间戳 那我们就调用logout 方法清空token
      store.dispatch('user/logout')
      // 调用router 返回到登录页面
      router.push('/login')
    }
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  console.log(config, 'request 请求拦截器')
  return config
}) // 创建一个请求拦截器
service.interceptors.response.use(
  function(response) {
    // 数据解构进行处理正确相应
    console.log(response, 'response')
    const { success, message, data } = response.data
    if (success) {
      // Message.success('登录成功')
      // nProgress.done()
      return data
    } else {
      Message.error(message)
    }
  }, function(error) {
    // 响应拦截器就是服务器返回我们的数据 在这里我们做token 失效处理
    if (error.response && error.response.data && error.response.data.code === 10002) {
      // 当等于10002的时候 表示 后端告诉我token超时了
      store.dispatch('user/logout') // 登出action 删除token
      router.push('/login')
    } else {
      Message.error(error.message)
    }
    return Promise.reject(error)
  }
) // 创建一个相应拦截器
// 进行es6模块话导出实例
function isCheckTimeTap() {
  // 当前时间戳
  const currentTimeTap = Date.now()
  // 当我们点击登录后获取我们在cookie 获得的缓存时间戳
  const timeTap = getTimeTap()
  // console.log(currentTimeTap)
  // 条件表达式的意思就是当前时间戳如果超过缓存时间戳太久了 就返回true
  return (currentTimeTap - timeTap) / 1000 > timeout
}
export default service
