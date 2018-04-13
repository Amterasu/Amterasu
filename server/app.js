const express = require('express')
const app = express()
const path = require('path')
// const fs = require('fs')
const bodyParser = require('body-parser')
const session = require('express-session')
const api = require('./api')

app.get('/', function (req, res) {
  // res.send('Hello World!')
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})
app.get('/index', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'))
})
app.use(express.static(path.join(__dirname, '../dist')))

app.use(express.static(path.join(__dirname, '../avatar')))

app.use(express.json({ limit: '5mb' }))
app.use(session({
  secret: '12345',
  cookie: { maxAge: 60 * 1000 * 60 },
  resave: false,
  saveUninitialized: true
}))

app.use(bodyParser.json())
// 当extended为false的时候，键值对中的值就为'String'或'Array'形式，为true的时候，则可为任何数据类型。
app.use(bodyParser.urlencoded({ extended: false }))
app.use(api)

module.exports = app.listen(80, function (err) {
  if (err) {
    console.log(err)
    return
  }
  console.log('Listening')
})
