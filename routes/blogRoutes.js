const express = require('express')
const Blog = require('../models/blog')

const router = express.Router()

// Blogs routes
router.get('/', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then((result) => {
      res.render('index', { title: 'All Blogs', blogs: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.post('/', (req, res) => {
  const blog = new Blog(req.body)

  blog.save()
    .then((result) => {
      res.redirect('/blogs')
    })
    .catch((err) => {
      console.log(err)
    })
})

router.get('/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' })
})

router.get('/:id', (req, res) => {
  const id = req.params.id
  Blog.findById(id)
    .then((result) => {
      res.render('details', { title: 'Blog Details', blog: result })
    })
    .catch((err) => {
      console.log(err)
    })
})

router.delete('/blogs/:id', (req, res) => {
  const id = req.params.id

  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ redirect: '/blogs' })
    })
    .catch((err) => {
      console.log(err)
    })
})

module.exports = router