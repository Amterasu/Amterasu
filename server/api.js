'use strict'
const db = require('./db')
const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const fs = require('fs')
const path = require('path')
const ObjectId = require('mongodb').ObjectId
var Geetest = require('gt3-sdk')
var app = express()
var bodyParser = require('body-parser')
var session = require('express-session')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: 'my-secret',
  resave: false,
  saveUninitialized: true
}))

// 极验的key 与 id
var slide = new Geetest({
  geetest_id: '71f476b6a0894780029f6f9a905adf20',
  geetest_key: 'f1fc1ed69f1e6e995d92cc308c154344'
})

// 请求验证码
router.get('/api/gt/register-slide', function (req, res) {
  // 向极验申请每次验证所需的challenge
  slide.register(null, function (err, data) {
    if (err) {
      console.error(err)
      res.status(500)
      res.send(err)
      return
    }

    if (!data.success) {
      // 进入 failback，如果一直进入此模式，请检查服务器到极验服务器是否可访问
      // 可以通过修改 hosts 把极验服务器 api.geetest.com 指到不可访问的地址

      // 为以防万一，你可以选择以下两种方式之一：

      // 1. 继续使用极验提供的failback备用方案
      req.session.fallback = true
      res.send(data)

      // 2. 使用自己提供的备用方案
      // todo
    } else {
      // 正常模式
      req.session.fallback = false
      res.send(data)
    }
  })
})
/** ************ 创建(create) 读取(get) 更新(update) 删除(delete) **************/
// 获取文章
router.post('/api/getList', (req, res) => {
  let filter = req.body
  if (req.body.classId) {
    //  根据分类id查询
    if (req.session.sign) { // 检查用户是否已经登录，登录后返回隐藏状态的文章
      db.Article.find({ 'category._id': ObjectId(filter.classId) }).sort({ updated: -1 }).exec((err, data) => {
        if (err) {
          res.send(err)
          return
        }
        res.send(data)
      })
    } else { // 否则只展示显示状态的文章
      db.Article.find({ 'category._id': ObjectId(filter.classId), 'showStatus': true }).sort({ updated: -1 }).exec((err, data) => {
        if (err) {
          res.send(err)
          return
        }
        res.send(data)
      })
    }
  } else {
    // 查询
    if (req.session.sign) { // 检查用户是否已经登录，登录后返回隐藏状态的文章
      db.Article.find(filter).sort({ updated: -1 }).exec((err, data) => {
        if (err) {
          res.send(err)
          return
        }
        res.send(data)
      })
    } else {
      // 否则只展示显示状态的文章
      filter.showStatus = true
      db.Article.find(filter).sort({ updated: -1 }).exec((err, data) => {
        if (err) {
          res.send(err)
          return
        }
        res.send(data)
      })
    }
  }
})
// 获取标签
router.post('/api/getTag', (req, res) => {
  db.Tag.find({}, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    res.send(data)
  })
})

// 文章详情页
router.get('/api/articleDetail/:id', function (req, res) {
  db.Article.findOne({ _id: req.params.id }, function (err, docs) {
    if (err) {
      console.error(err)
      return
    }
    res.send(docs)
  })
})
// 添加文章
router.post('/api/addArticle', function (req, res) {
  if (!req.session.sign) { // 检查用户是否已经登录
    res.send({ 'code': 0, 'msg': '请登录管理员账号进行操作' })
    return
  }
  if (!req.body.content) {
    res.send({ 'code': 0, 'msg': '未填写内容' })
    return
  }
  if (!req.body.title) {
    res.send({ 'code': 0, 'msg': '未填写标题' })
    return
  }
  if (!req.body.gist) {
    res.send({ 'code': 0, 'msg': '未填写摘要' })
    return
  }
  if (!req.body.category.length) {
    res.send({ 'code': 0, 'msg': '未选择标签' })
    return
  }
  const promises = req.body.category.map((value, index, arr) => db.Tag.findOne({ _id: value }))
  Promise.all(promises).then(function (posts) {
    req.body.category = posts
    db.Article.create(req.body, function (error, doc) {
      if (error) {
        console.error(error)
      } else {
        res.send({ 'code': 1, 'msg': '添加成功' })
      }
    })
  }).catch(function (reason) {
    res.send({ 'code': 0, 'msg': '添加失败' })
  })
})
// 修改文章
router.post('/api/updateArticle', function (req, res) {
  if (!req.session.sign) { // 检查用户是否已经登录
    res.send({ 'code': 0, 'msg': '请登录管理员账号进行操作' })
    return
  }
  if (!req.body.content) {
    res.send({ 'code': 0, 'msg': '未填写内容' })
    return
  }
  if (!req.body.title) {
    res.send({ 'code': 0, 'msg': '未填写标题' })
    return
  }
  if (!req.body.gist) {
    res.send({ 'code': 0, 'msg': '未填写摘要' })
    return
  }
  if (!req.body.category.length) {
    res.send({ 'code': 0, 'msg': '未选择标签' })
    return
  }
  const promises = req.body.category.map((value, index, arr) => db.Tag.findOne({ _id: value }))
  Promise.all(promises).then(function (posts) {
    req.body.category = posts
    db.Article.findByIdAndUpdate(req.body.id, req.body, function (error, doc) {
      if (error) {
        console.error(error)
      } else {
        res.send({ 'code': 1, 'msg': '修改成功' })
      }
    })
  }).catch(function (reason) {
    res.send({ 'code': 0, 'msg': '修改失败' })
  })
})

// 登录
router.post('/api/login', (req, res) => {
  if (!req.body.username || !req.body.password) {
    res.send({ 'code': 0, 'msg': '登录失败' })
    return false
  }
  // 对请求提供的验证凭证进行二次验证
  slide.validate(req.session.fallback, {
    geetest_challenge: req.body.geetest_challenge,
    geetest_validate: req.body.geetest_validate,
    geetest_seccode: req.body.geetest_seccode
  }, function (err, success) {
    if (err) {
      // 网络错误
      res.send({
        status: '0',
        msg: err
      })
    } else if (!success) {
      // 二次验证失败
      res.send({
        status: '0',
        msg: '登录失败'
      })
    } else {
      db.User.find({ username: req.body.username, password: req.body.password }, (err, docs) => {
        if (err) {
          res.send(err)
          return
        }
        if (docs.length > 0) {
          req.session.sign = true
          res.send({ 'code': 1, 'msg': '登陆成功' })
        } else {
          res.send({ 'code': 0, 'msg': '登录失败' })
        }
      })
    }
  })
})
// 退出登录
router.post('/api/logout', (req, res) => {
  req.session.sign = false
  res.send({ 'code': 1, 'msg': '已退出登录' })
})
// 检测session
router.post('/api/checkUser', (req, res) => {
  if (req.session.sign) { // 检查用户是否已经登录
    res.send({ 'code': 1 })
  } else { // 否则展示index页面
    res.send({ 'code': 0 })
  }
})

/* 图片上传路由 */
router.post('/uploader', function (req, res) {
  var form = new formidable.IncomingForm() // 创建上传表单
  form.encoding = 'utf-8' // 设置编辑
  form.uploadDir = path.join(__dirname, '../', './avatar/') // 设置上传目录
  form.keepExtensions = true // 保留后缀
  form.maxFieldsSize = 2 * 1024 * 1024 // 文件大小

  form.parse(req, function (err, fields, files) {
    if (err) {
      res.locals.error = err
      // res.render('index', { title: TITLE })
      res.send({ 'code': 0 })
      return
    }

    var extName = '' // 后缀名
    switch (files.image.type) {
      case 'image/pjpeg':
        extName = 'jpg'
        break
      case 'image/jpeg':
        extName = 'jpg'
        break
      case 'image/png':
        extName = 'png'
        break
      case 'image/x-png':
        extName = 'png'
        break
    }

    if (extName.length === 0) {
      res.locals.error = '只支持png和jpg格式图片'
      res.send({ 'code': 0 })
      return
    }

    var avatarName = Math.random() + '.' + extName
    // 图片写入地址；
    var newPath = form.uploadDir + avatarName
    // 显示地址；
    // var showUrl = path.join(__dirname, '../', './avatar/') + avatarName
    fs.renameSync(files.image.path, newPath) // 重命名
    res.json({
      'newPath': 'http://47.95.9.245/' + avatarName
    })
  })
})
module.exports = router
