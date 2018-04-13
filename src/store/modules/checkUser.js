import api from '../../api/api'

const state = {
  login: false // 是否登录
}

// getters
// const getters = {
//   allProducts: state => state.login
// }

// actions
const actions = {
  getLoginStatus ({ commit }) {
    api.checkUser(res => {
      commit('setLoginStatus', res)
    })
  }
}

// mutations
const mutations = {
  setLoginStatus (state, res) {
    state.login = res.data.code
  }
}

export default {
  state,
  // getters,
  actions,
  mutations
}
