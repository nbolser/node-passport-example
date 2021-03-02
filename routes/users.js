const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

// User model
const User = require('../models/User')

// Login
router.get('/login', (req, res) => {
  console.log('login');
  console.log(res.locals);
  res.render('login')
})
// Register
router.get('/register', (req, res) => res.render('register'))

// Regisger handle
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body
  let errors = []

  // Check required fields
  if (!name || !email || !password || !password2) {
    errors.push({ msg:' Please fill out all required fields' })
  }

  // Check password match
  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  // Check password length
  if (password.length < 6) {
    errors.push({ msg: 'Password should be at least 6 characters' })
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })
  } else {
    // Validation passes
    User.findOne({ email: email })
      .then(user => {
        if (user) {
          // User exists
          errors.push({ msg: 'User is already registered' })
          res.render('register', {
            errors,
            name,
            email,
            password,
            password2
          })
        } else {
          const newUser = new User({
            name, email, password
          })
          // Hash password
          bcrypt.genSalt(10, (err, salt) =>
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw error;
              // Set password to hash
              newUser.password = hash
              // Save user
              newUser.save()
                .then(user => {
                  console.log(res.locals);
                  req.flash('success_msg', 'You are now registered. Feel free to log in.')
                  res.redirect('/users/login')
                })
                .catch(error => console.log(error))
          }))
        }
      })
  }
})

module.exports = router
