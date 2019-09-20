import router from './router'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      // 返回登录页
      next('/login')
    }
  } else {
    next() // 放行
  }
})
export default router