/**
 * Mocking client-server processing
 * 只发送请求，不处理业务逻辑
 */
import { post, get, notice } from '../../static/js/common'

export default {
  // 获取文章列表
  getList (filter, cb) {
    post('/api/getList', filter).then(res => {
      res.data.forEach((value, index, arr) => {
        let gistHeight = Math.ceil(value.gist.length / 24) * 24
        let titleHeight = 58
        let footerHeight = 36
        let paddingheight = 56
        value.cheight = parseInt(gistHeight + titleHeight + footerHeight + paddingheight)
      })
      cb(res.data)
    })
  },
  // 获取文章详情
  getArticleDetail (id, cb) {
    get(`/api/articleDetail/${id}`).then(res => {
      cb(res)
    }, res => {
      notice.error('服务器错误')
    })
  },
  // 登录
  login (params, cb) {
    post(`/api/login`, params).then(res => {
      cb(res)
    }, res => {
      notice.error('服务器错误')
    })
  },
  // 登出
  logout (cb) {
    post(`/api/logout`).then(res => {
      cb(res)
    }, res => {
      notice.error('服务器错误')
    })
  },
  // 检测登录状态
  checkUser (cb) {
    post('/api/checkUser').then(
      res => {
        cb(res)
      }, res => {
        notice.error('服务器错误')
      }
    )
  },
  // 获取所有文章标签
  getTag (cb) {
    post('/api/getTag').then(
      res => {
        cb(res)
      }, res => {
        notice.error('服务器错误')
      }
    )
  },
  // 添加文章
  addArticle (data, cb) {
    post('/api/addArticle', data).then(
      res => {
        cb(res)
      }, res => {
        notice.error('服务器错误')
      }
    )
  },
  // 修改文章
  updateArticle (data, cb) {
    post('/api/updateArticle', data).then(
      res => {
        cb(res)
      }, res => {
        notice.error('服务器错误')
      }
    )
  }
}
