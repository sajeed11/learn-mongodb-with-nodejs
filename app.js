const express = require('express')
const { ObjectId } = require('mongodb')
const { connecToDb, getDb } = require('./db')

// init app & middleware
const app = express()
app.use(express.json())

// db connection
let db

connecToDb((err) => {
  if (!err) {
    app.listen(3000, () => {
      console.log('app is listening in port 3000!')
    })
    db = getDb()
  }
})

// routes
app.get('/books', (req, res) => {
  let books = []

  db.collection('books')
    .find()
    .sort({ auther: 1 })
    .forEach(book => books.push(book))
    .then(() => {
      res.status(200).json(books)
    })
    .catch(() => {
      res.status(500).json({ error: "We couldn't fetch the docs" })
    })
})

app.get('/books/:id', (req, res) => {

  if (ObjectId.isValid(req.params.id)) {
    db.collection('books')
      .findOne({ _id: new ObjectId(req.params.id) })
      .then(doc => {
        res.status(200).json(doc)
      })
      .catch(err => {
        res.status(500).json({ error: "We couldn't fetch the right doc :(" })
      })
  } else {
    res.status(500).json({ error: "Not valid doc id :|" })
  }

})

app.post('/books', (req, res) => {
  const book = req.body

  db.collection('books')
    .insertOne(book)
    .then(result => {
      res.status(201).json(result)
    })
    .catch(err => {
      res.status(500).json({ error: "We could create your doc :(" })
    })
})