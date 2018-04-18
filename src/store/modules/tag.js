import api from '../../api/api'
import { SET_TAGS, SET_SELECTED_TAG } from '../mutation-types'
import { GET_TAGS } from '../action-types'

const state = {
  allTags: [], // 标签数据
  selectedTagId: ''
}

// actions
const actions = {
  async [GET_TAGS] ({ commit }) {
    let tags = await api.getTag()
    commit(SET_TAGS, tags.data)
  }
}

// mutations
const mutations = {
  [SET_TAGS] (state, list) {
    state.allTags = list
  },
  [SET_SELECTED_TAG] (state, id) {
    state.selectedTagId = id
  }
}

export default {
  state,
  actions,
  mutations,
  namespaced: true
}
