const express = require('express')
const router = express.Router()
const passport = require('passport')
const bcrypt = require('bcryptjs')
const db = require('../../models')
const User = db.User


router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const errors = []
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' })
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符。' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword
    })
  }
  // MySQL 會使用 WHERE 來加入條件語句，在 Sequelize 裡，就會變成在參數裡加上 where，可以根據我們指令的條件來尋找資料。
  User.findOne({ where: { email } }).then(user => {
    if (user) {
      // console.log('User already exists')改為以下
      errors.push({ message: '這個Email已經註冊過了。' })
      return res.render('register', {
        error,
        name,
        email,
        password,
        confirmPassword
      })
    }
    return bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(password, salt))
      .then(hash => User.create({
        name,
        email,
        password: hash
      }))
      .then(() => res.redirect('/'))
      .catch(err => console.log(err))
  })
})

router.get('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login');
  });
});

module.exports = router