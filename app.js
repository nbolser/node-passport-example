const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const expressLayouts = require('express-ejs-layouts')
const { port, mongoUri } = require('./config')
const mongoose = require('mongoose')
const app = express()

// Connect to MongoDb
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb connected...'))
  .catch(err => console.log(console.log(`MongoDb error: ${err}`)))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Parse body
app.use(express.urlencoded({ extended: false }))

// Express session middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

// Connect flash
app.use(flash())

// Global variables
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.error_msg = req.flash('error_msg')
  next();
} )

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(port, console.log(`Server started on port: ${port}`))
