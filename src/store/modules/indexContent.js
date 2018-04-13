import api from '../../api/api'

const state = {
  all: [] // 列表数据
}

// getters
// const getters = {
//   allProducts: state => state.all
// }

// actions
const actions = {
  getList ({ commit }, filter = {}) {
    api.getList(filter, list => {
      commit('setList', list)
    })
  }
}

// mutations
const mutations = {
  setList (state, list) {
    state.all = list
  }
}

export default {
  state,
  // getters,
  actions,
  mutations
}
