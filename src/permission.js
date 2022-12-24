
// 在这里我们需要处理路由导航问题 意思就是我们在登录页面的时候我们需要判断用户行为
// 进行路由处理导入router文件
import router from '@/router/index'
// 导入vue store实例进行token 判断
import store from '@/store/index'
// 导入进度条插件进行进度条处理
import nProgress from 'nprogress'
// 导入样式
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404'] // 定义白名单，意思就是登录页面和404页面不受权限路由的页面
router.beforeEach(async function(to, from, next) {
  nProgress.start()
  //   判断我们token是否存在
  console.log(store.getters, '222222222222222')
  if (store.getters.token) {
    // console.log('2')
    console.log(store.getters, '这里触发函数')
    // 判断是否导航是从login 开始的 如果是的那我们就放行让其调到主页 在路由导航里面我们的path'./' 就是主页面
    if (to.path === '/login') {
      console.log('从这里触发to 到 dashboard')
      next('/')
    } else {
      // 我们需要在这里处理我们需要的userinfo 用户信息
      if (!store.getters.userId) {
        // console.log(store.getters, '触发store getter userinfo')
        // 这里会触发我们需要的数据 所以我们在这里进行vuex 异步处理函数
        // 因为我们需要处理异步请求函数所以我们需要在这里使用把异步转换成同步的方法 要不然我们拿不到数据 使用async await
        await store.dispatch('user/getuserInfo')
      }
      next()
    }
  } else {
    console.log('走到这里的白名单进行登录处理')
    if (whiteList.indexOf(to.path) > -1) {
      // 如果是在白名单里面 我们可以直接放行 意思是我们在登录页面 或者404页面
      next()
    } else {
      // 如果没有token 也没在白名单里面 那么我们如果要手动输入其他路由页面，那么我们就要导航到登录页面
      next('/login')
    }
  }
  //   触发进度条完成后
  nProgress.done()
})// 定义路由前置守卫
router.afterEach(function(to, from, next) {
  nProgress.done()
}) // 定义路由后置守卫

