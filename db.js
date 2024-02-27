const { MongoClient } = require('mongodb')

let dbConnection

// cb is the callback funciton which will fire after we estaplish the connection with our DB
module.exports = {
  connecToDb: (cb) => {
    MongoClient.connect('mongodb://localhost:27017/bookStore')
      .then((client) => {
        dbConnection = client.db()
        return cb()
      })
      .catch(err => {
        console.log(err)
        return cb(err)
      })
  },
  getDb: () => dbConnection,
}