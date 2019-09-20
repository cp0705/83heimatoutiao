// 统一注册组件
import latoutAside from './home/layout-aside'
import latoutHeader from './home/layout-header'

export default {
  install (Vue) {
    Vue.component('layout-aside', latoutAside)
    Vue.component('layout-header', latoutHeader)
  }
}
