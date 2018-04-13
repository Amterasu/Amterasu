import Vue from 'vue'
import Vuex from 'vuex'
import indexContent from './modules/indexContent'
import checkUser from './modules/checkUser'
import tag from './modules/tag'
// import { mapState } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    indexContent,
    checkUser,
    tag
  }
})
