import api from '../../api/api'

const state = {
  allTags: [] // 列表数据
}

// getters
// const getters = {
//   allProducts: state => state.all
// }

// actions
const actions = {
  getTags ({ commit }) {
    api.getTag(list => {
      commit('setTags', list)
    })
  }
}

// mutations
const mutations = {
  setTags (state, list) {
    state.allTags = list.data
  }
}

export default {
  state,
  // getters,
  actions,
  mutations
}
