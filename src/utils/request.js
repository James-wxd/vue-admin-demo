import axios from 'axios'
// 导入message 模块进行处理数据
import { Message } from 'element-ui'
// 创建一个axios 实例
const service = axios.create({
//  配置公共的请求接口
// 当我们运行npm run dev 之后那么process 对象的env.vue的值为/api
// 线上地址为prod-api
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000
})
service.interceptors.request.use() // 创建一个请求拦截器
service.interceptors.response.use(
  function(response) {
    // 数据解构进行处理正确相应
    console.log(response, 'response')
    const { success, message, data } = response.data
    if (success) {
      Message.success('登录成功')
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
