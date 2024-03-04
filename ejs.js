const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')

const app = express()

// Replcae the dbURI with your acctual db in your workspace
const dbURI = 'mongodb://localhost:27017/node-heros'
mongoose.connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err))

// register view engine
app.set('view engine', 'ejs')

// middleware & static files
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// We used the next param: Function to tell the express to move on to 
// the next function, otherwise if we won't add it the 
// code it will be stucked in theis middleware :X
// app.use((req, res, next) => {
//   console.log('hostname', req.hostname)
//   next()
// })

// mongoose and mongo sandbox routes
// app.get('/add-blog', (req, res) => {
//   const blog = new Blog({
//     title: 'new second blog',
//     snippet: 'about my new second blog',
//     body: 'more about my new second blog'
//   })

//   blog.save()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })

// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })

// app.get('/single-blog', (req, res) => {
//   Blog.findById('65e5f57ddc85c978da614fa6')
//     .then((result) => {
//       res.send(result)
//     })
//     .catch((err) => {
//       console.log(err)
//     })
// })

// Routes
app.get('/', (req, res) => {
  res.redirect('/blogs')
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

// blog routes
app.use('/blogs', blogRoutes)

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})