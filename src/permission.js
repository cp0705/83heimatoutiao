import router from './router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  NProgress.start()
  if (to.path.startsWith('/home')) {
    let token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      // 返回登录页  next(false)中断
      next('/login') // 强制跳转
    }
  } else {
    next() // 放行
  }
})
router.afterEach(() => {
  NProgress.done()
})
export default router
