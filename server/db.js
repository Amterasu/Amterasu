var mongoose = require('mongoose') // 引入mongoose

var db = mongoose.connection
db.on('error', function callback () { // 监听是否有异常
  console.log('Connection error')
})
db.once('open', function callback () { // 监听一次打开
  // 在这里创建你的模式和模型
  console.log('connected!')
})

mongoose.connect('mongodb://47.95.9.245:27017/myapp') // 连接到mongoDB的myapp数据库
// 该地址格式：mongodb://[username:password@]host:port/database[?options]
// 默认port为27017

/** ************ 定义模式Schema **************/
// const loginSchema = mongoose.Schema({
//     account : String,
//     password : String
// });

// user
const userSchema = new mongoose.Schema({
  username: String,
  password: String
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
}
)
// 标签
const tagSchema = new mongoose.Schema({
  name: String
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
// article
const articleSchema = new mongoose.Schema({
  title: String,
  date: String,
  _v: Number,
  pic: String,
  gist: String,
  content: String,
  showStatus: Boolean,
  category: Array
}, {
  timestamps: { createdAt: 'created', updatedAt: 'updated' }
})
/** ************ 定义模型Model **************/
// const Models = {
//     Login : mongoose.model('Login',loginSchema)
// }

const Models = {
  User: mongoose.model('User', userSchema, 'User'),
  Tag: mongoose.model('Tag', tagSchema, 'Tag'),
  Article: mongoose.model('Article', articleSchema, 'Article')
}

module.exports = Models
