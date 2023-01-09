import Vue from 'vue'
import VueI18n from 'vue-i18n'
import Cookies from 'js-cookie'
import ElementUIZH from 'element-ui/lib/locale/lang/zh-CN'
import ElementUIEN from 'element-ui/lib/locale/lang/en'
import customerzh from './zh'
import customeren from './en'
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: Cookies.get('language') || 'zh',
  messages: {
    en: {
      ...ElementUIEN,
      ...customeren
    },
    zh: {
      ...ElementUIZH,
      ...customerzh
    }
  }
})
export default i18n
// export default { 'name': 'james' }
