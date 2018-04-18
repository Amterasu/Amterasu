/**
 * Mocking client-server processing
 * 只发送请求，不处理业务逻辑
 */
import { post, get } from '../../static/js/common'

export default {
  // 获取文章列表
  getList (filter) {
    return post('/api/getList', filter)
  },
  // 获取文章详情
  getArticleDetail (id) {
    return get(`/api/articleDetail/${id}`)
  },
  // 登录
  login (params) {
    return post(`/api/login`, params)
  },
  // 登出
  logout () {
    return post(`/api/logout`)
  },
  // 检测登录状态
  checkUser () {
    return post('/api/checkUser')
  },
  // 获取所有文章标签
  getTag () {
    return post('/api/getTag')
  },
  // 添加文章
  addArticle (data) {
    return post('/api/addArticle', data)
  },
  // 修改文章
  updateArticle (data) {
    return post('/api/updateArticle', data)
  }
}
