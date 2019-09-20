import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import ElementUI from 'element-ui'
import Component from './components'
import axios from './utils/axios.config'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
Vue.config.productionTip = false
Vue.use(axios)
Vue.use(ElementUI) // 相当于全局注册elementUI
Vue.use(Component) // 全局注册组件
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
