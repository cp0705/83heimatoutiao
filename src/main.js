import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import Component from './components'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios

Vue.config.productionTip = false
Vue.use(ElementUI) // 相当于全局注册elementUI
Vue.use(Component) // 全局注册组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
