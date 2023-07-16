require('dotenv').config()
const express = require('express')
const app = express()
const routes = require('./router')
const path = require('path')
const helmet = require('helmet')
const csrf = require('csurf')
const {
  middlewareGlobal,
  checkCsrfError,
  csrfMiddlware
} = require('./src/middlewares/middleware')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')
const sessionOptions = session({
  secret: 'oYGIghoIGBirwerwr234Ewe',
  store: MongoStore.create({ mongoUrl: process.env.CONNECTIONSTRING }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
})

mongoose
  .connect(process.env.CONNECTIONSTRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('Conectei a base de dados')
    app.emit('pronto')
  })
  .catch(e => console.log(e))

app.use(helmet())

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.resolve(__dirname, 'public')))

app.use(sessionOptions)
app.use(flash())

app.set('views', path.resolve(__dirname, 'src', 'views'))
app.set('view engine', 'ejs')

app.use(csrf())

app.use(middlewareGlobal)
app.use(checkCsrfError)
app.use(csrfMiddlware)
app.use(routes)

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('Acessar http://localhost:3000')
    console.log('Servidor executando na porta 3000')
  })
})
