import api from '../../api/api'
import { SET_LIST, RESET_PAGE, INCREMENT_PAGE } from '../mutation-types'
import { GET_LIST } from '../action-types'

const state = {
  all: [], // 列表数据
  page: 1, // 分页
  count: '' // 总数 这个变量没有被共享，但是在content组件内获取不到，日后在解决
}

// actions
const actions = {
  async [GET_LIST] ({ commit, rootState }, filter = {}) {
    Object.assign(filter, {
      page: state.page,
      pageSize: 10,
      classId: rootState.tag.selectedTagId
    })
    let list = await api.getList(filter)
    list.data.data.forEach((value, index, arr) => {
      let gistHeight = Math.ceil(value.gist.length / 24) * 24
      let titleHeight = 58
      let footerHeight = 36
      let paddingheight = 56
      value.cheight = parseInt(gistHeight + titleHeight + footerHeight + paddingheight)
    })
    state.count = list.data.count
    commit(SET_LIST, list.data)
  }
}

// mutations
const mutations = {
  [SET_LIST] (state, list) {
    state.all = state.all.concat(list.data)
  },
  [RESET_PAGE] (state) {
    state.page = 1
    state.all = []
  },
  [INCREMENT_PAGE] (state) {
    state.page++
  }
}

export default {
  state,
  actions,
  mutations,
  namespaced: true
}
