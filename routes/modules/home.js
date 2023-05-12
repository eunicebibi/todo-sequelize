const express = require('express')
const router = express.Router()
const Todo = db.Todo

router.get('/', (req, res) => {
  // 查詢多筆資料：要在 findAll({ raw: true, nest: true }) 直接傳入參數
  return Todo.findAll({
    raw: true,
    nest: true
  })
    .then((todos) => { return res.render('index', { todos: todos }) })
    .catch((error) => { return res.status(422).json(error) })
})

module.exports = router