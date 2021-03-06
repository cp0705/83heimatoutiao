// 统一注册组件
import layoutAside from './home/layout-aside'
import layoutHeader from './home/layout-header'
import breadCrumb from './common/bread-crumb'
import coverImag from './publish/cover-image'
import selectImg from './publish/select-img'
import timeDate from './common/time-date'
// 富文本编辑器
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'

export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside)// 左侧导航
    Vue.component('layout-header', layoutHeader)// 右侧头部
    Vue.component('bread-crumb', breadCrumb)// 面包屑
    Vue.component('quill-editor', quillEditor)// 富文本编辑器
    Vue.component('cover-image', coverImag)
    Vue.component('select-img', selectImg)
    Vue.component('time-date', timeDate)
  }
}
