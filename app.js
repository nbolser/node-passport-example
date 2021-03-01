const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const { port, mongoUri } = require('./config');
const mongoose = require('mongoose')
const app = express()

console.log(mongoUri);

// Connect to MongoDb
mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDb connected...'))
  .catch(err => console.log(console.log(`MongoDb error: ${err}`)))

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

// Routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))

app.listen(port, console.log(`Server started on port: ${port}`))
