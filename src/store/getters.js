const getters = {
  sidebar: state => state.app.sidebar,
  name: state => state.user.userInfo.username,
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  userId: state => state.user.userInfo.userId, // 这里我们可以动态数据更好的展示 在箭头函数中=> 隐式存在return
  staffPhoto: state => state.user.userInfo.staffPhoto,
  companyId: state => state.user.userInfo.companyId,
  routes: state => state.permission.router

}
export default getters
