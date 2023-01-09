import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN'
import i18n from '@/components/lang'
import '@/styles/index.scss' // global css
// 导入我们需要的全局注册组件
import globalTools from '@/components/pageTools/global'
import App from './App'
import store from './store'
import router from './router'
import * as directive from './directive/index'
import * as filters from '@/filters' // 引入工具类
import '@/icons' // icon
import '@/permission' // permission control
import 'default-passive-events'
console.log(i18n, 'i18n11111111111')
// 引入echarts 模块
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
Object.keys(directive).forEach(function(key) {
  // console.log(directive)
  console.log(key, '=============', directive[key], '111111111111111111')
  Vue.directive(key, directive[key])
})
Object.keys(filters).forEach(key => {
  // 注册过滤器
  Vue.filter(key, filters[key])
})
// console.log(directive)
/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// 使用全局注册组件
Vue.use(globalTools)
// set ElementUI lang to EN
Vue.use(ElementUI, { i18n: (key, value) => i18n.t(key, value) })
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  i18n,
  router,
  store,
  render: h => h(App)
})
