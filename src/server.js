const express = require('express')
const mongoose = require('mongoose')
const { routes } = require('./routes')
const path = require('path')
const cors = require('cors')

const app = express()

app.use(cors())

const server = require('http').Server(app)
const io = require('socket.io')(server)

io.on('connection', socket => {
  console.log('ok')
})

mongoose.connect(
  'mongodb+srv://admin:admin@cluster0-t6vxp.mongodb.net/test?retryWrites=true',
  {
    useNewUrlParser: true
  }
)

app.use((req, res, next) => {
  req.io = io

  return next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')))

app.use(routes)

server.listen(process.env.PORT || 3333)
