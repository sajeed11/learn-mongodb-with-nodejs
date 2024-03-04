const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()

const dbURI = 'mongodb://localhost:27017'

// register view engine
app.set('view engine', 'ejs')

app.listen(3000)

// middleware & static files
app.use(express.static('public'))

// We used the next param: Function to tell the express to move on to 
// the next function, otherwise if we won't add it the 
// code it will be stucked in theis middleware :X
// app.use((req, res, next) => {
//   console.log('hostname', req.hostname)
//   next()
// })

// Externe middleware from other package
app.use(morgan('dev'))

app.get('/', (req, res) => {
  const blogs = [
    { title: 'Killwa saved Gon', snippet: 'Lorem ipsum dolor sit awet constreateur' },
    { title: 'Gon finds his father', snippet: 'Lorem ipsum dolor sit awet constreateur' },
    { title: 'Korabika has killed the spiders', snippet: 'Lorem ipsum dolor sit awet constreateur' },
  ]
  res.render('index', { title: 'Home', blogs })
})

app.get('/about', (req, res) => {
  res.render('about', { title: 'About' })
})

app.get('/blogs/create', (req, res) => {
  res.render('create', { title: 'Create a new Blog' })
})

app.use((req, res) => {
  res.status(404).render('404', { title: '404' })
})