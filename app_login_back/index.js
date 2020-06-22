const express = require('express') 
const app = express()
const cors = require('cors') 

const MongoClient = require('mongodb').MongoClient

const DB_NAME = 'db_loging'
const TAB_NAME = 'user_logins'

app.use(cors())

app.get('/loging', (req, res) => {
  MongoClient.connect(
    'mongodb://localhost/',
    { useNewUrlParser: true },
    function (error, client) {
      if (error) return funcCallback(error)

      let db = client.db(DB_NAME)

      db.collection(TAB_NAME)
        .find()
        .toArray(function (error, results) {
          if (error) throw error
          res.status(200).send(results)
        })
    }
  )
})

app.listen(8050, (err) => {
  if (err) {
    throw new Error('Something bad happened...')
  }
  console.log('server is listening on port 8050')
})
