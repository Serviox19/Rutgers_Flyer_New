var express = require('express');
var router = express.Router();
var Sequelize = require('sequelize');
var connection = new Sequelize('rutgersflyers_db', 'root');
var User = require('../models/user.js');


router.get('/', function(req, res) {
  res.render('home', {title: 'Welcome to Rutgers Flyer'});
});

router.post('/save', function(req, res) {
  User.create(req.body).then(function(result){
    res.redirect('/');
  }).catch(function(err) {
    console.log(err);
    res.redirect('/?msg=' + err.errors[0].message);
  });
});


router.post('/login', function(req, res) {
  var email = req.body.email;
  var password = req.body.password;

  User.findOne({
    where: {
      email: email,
      password: password
    }
  }).then(function(user){
    if(user){
      req.session.authenticated = user;
      res.redirect('/dashboard');
    } else {
      res.redirect('/?msg=Invalid login');
    }
  }).catch(function(err){
    throw err;
  });
});

router.get('/dashboard', function(req,res) {

  // if user is authenticated
  if(req.session.authenticated){
    res.render('dashboard', { title: 'Dashboard', layout: 'dashboard'});
  } else {
    res.redirect("/?msg=you are not logged in");
  }
});




module.exports = router;
