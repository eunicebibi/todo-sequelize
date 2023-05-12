const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const bcrypt = require('bcryptjs')
const session = require('express-session')
const passport = require('passport')
// 載入設定檔，要寫在 express-session 以後
const usePassport = require('./config/passport')
const routes = require('./routes')
const db = require('./models')
const Todo = db.Todo
const User = db.User
const app = express()
const PORT = 3000
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))
require('./config/passport')
// 呼叫 Passport 函式並傳入 app，這條要寫在路由之前
usePassport(app)
app.use(routes)






app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}`)
})
