import api from '../../api/api'
import { SET_LOGIN_STATUS } from '../mutation-types'
import { GET_LOGIN_STATUS } from '../action-types'

const state = {
  loginStatus: false // 是否登录
}

// actions
const actions = {
  async [GET_LOGIN_STATUS] ({ commit }) {
    let loginStatus = await api.checkUser()
    commit(SET_LOGIN_STATUS, loginStatus)
  }
}

// mutations
const mutations = {
  [SET_LOGIN_STATUS] (state, res) {
    state.loginStatus = res.data.code
  }
}

export default {
  state,
  // getters,
  actions,
  mutations,
  namespaced: true
}
