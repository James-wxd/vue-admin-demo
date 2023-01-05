import globalTools from '@/components/pageTools'
import uploadExcel from '@/components/uploadexcel'
export default {
  // VUE提供install 方法 第一个参数是组件 指令 挂在vue的原型
  install: function(Vue) {
    Vue.component('globalTools', globalTools)
    Vue.component('uploadExcel', uploadExcel)
  }
}
