const express = require('express')
const blogController = require('../controllers/blogController')

const router = express.Router()

// Blogs routes
router.get('/', blogController.blog_index)
router.post('/', blogController.blog_create_post)
router.get('/create', blogController.blog_create_get)
router.get('/:id', blogController.blog_details)
router.delete('/blogs/:id', blogController.blog_delete)

module.exports = router