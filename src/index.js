import express from 'express'
import bodyParser from 'body-parser'
import routes from './routes'
const initDb = require('./db').initDb
const port = 3000
const app = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true
  })
)

app.use('/api', routes)

initDb(() => {
  app.listen(port, err => {
    if (err) {
      throw err
    }
    console.log(`server is listening on port ${port}`)
  })
})
