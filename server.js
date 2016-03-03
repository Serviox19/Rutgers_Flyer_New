//npm packages//
var express = require('express');
var expressHandlebars = require('express-handlebars');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs')
var app = express();
var PORT = process.env.PORT || 3000;


var Sequelize = require('sequelize');


if(process.env.NODE_ENV === 'production') {
  // Heroku DB
  console.log(process.env.JawsDB_URL);
  var connection = new Sequelize(process.env.JAWSDB_URL);
} else {
  var connection = new Sequelize('rutgersflyers_db', 'root');
}



//routes
var routes = require('./routes/index');
app.use('/', routes);

//bodyParser
app.use(bodyParser.urlencoded({extended: false}));

//set up handlebars layout
app.engine('handlebars', expressHandlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + "/public"));


//passport
var passport = require('passport');
var passportLocal = require('passport-local');

//middleware
app.use(require('express-session')({
    secret: "supersecret",
    resave: true,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: (1000 * 60 * 60 *24 * 14)
    },
}));


// database connection via sequelize
connection.sync().then(function() {
  app.listen(PORT, function() {
      console.log("Listening on:" + PORT)
  });
});


