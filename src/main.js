// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import '../static/css/reset.css'
import store from './store/index'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import ElementUI from 'element-ui'
import Vuerify from 'vuerify'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/css/element-variables.scss'
import '../static/js/gt'
Vue.use(mavonEditor)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.use(Vuerify)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
