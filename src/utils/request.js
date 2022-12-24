import store from '@/store'
import axios from 'axios'
// 导入message 模块进行处理数据
import { Message } from 'element-ui'
// 导入进度条插件
// import nProgress from 'nprogress'
// // 导入样式
// import 'nprogress/nprogress.css' // 引入进度条样式
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
    config.headers['Authorization'] = `Bearer ${store.getters.token}`
  }
  console.log(config, 'config123')
  return config
}) // 创建一个请求拦截器
service.interceptors.response.use(
  function(response) {
    // 数据解构进行处理正确相应
    console.log(response, 'response')
    const { success, message, data } = response.data
    if (success) {
      Message.success('登录成功')
      // nProgress.done()
      return data
    } else {
      Message.error(message)
    }
  }, function(error) {
    Message.error(error.message)
    return Promise.reject(error)
  }
) // 创建一个相应拦截器
// 进行es6模块话导出实例
export default service
