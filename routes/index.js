const express = require('express');
const router = express.Router();

const user = {
  username: 'Sudhin',
  password: 'password'
}


/* GET login page. */
router.get('/', function (req, res) {
  if (req.session.user) {
    res.redirect('/homepage');
  } else {
    res.render('index', { title: "Login Page", message: ' ' })
  }
});


router.post('/', (req, res) => {
  if (req.body.username === user.username && req.body.password === user.password) {
    req.session.user = user;
    res.redirect('/homepage');
  } else {
    res.render('index', { title: "Login Page", message: "Incorrect username or password" });
  }
});

router.get('/homepage', (req, res) => {
  if (!req.session.user) {
    res.redirect('/');
  } else {
    res.render('homepage', { title: "Home Page", user: req.session.user })
  }
})


router.get('/logout', (req, res) => {
  req.session.user = null;
  res.redirect('/')
})

module.exports = router;
