import globalTools from '@/components/pageTools'
import uploadExcel from '@/components/uploadexcel'
import screenfull from '@/components/screenful'
import ThemePicker from '@/components/timePicker'
import languageVue from '@/components/lang/index.vue'
export default {
  // VUE提供install 方法 第一个参数是组件 指令 挂在vue的原型
  install: function(Vue) {
    Vue.component('globalTools', globalTools)
    Vue.component('uploadExcel', uploadExcel)
    Vue.component('screenFull', screenfull) // 注册全屏组件
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('languageVue', languageVue)
  }
}
