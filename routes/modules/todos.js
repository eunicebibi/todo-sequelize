const express = require('express')
const router = express.Router()
const Todo = db.Todo

router.get('/new', (req, res) => {
  return res.render('new')
})


router.get('/todos/:id', (req, res) => {
  const id = req.params.id
  // 在 Sequelize 裡面，用 id 查詢的方法是 findByPk
  return Todo.findByPk(id)
    // 查詢單筆資料：在 res.render 時在物件實例 todo 後串上 todo.toJSON()。
    // 資料轉換成 plain object 的方法，只需要直接在傳入樣板前加上 toJSON()
    .then(todo => res.render('detail', { todo: todo.toJSON() }))
    .catch(error => console.log(error))
})

module.exports = router