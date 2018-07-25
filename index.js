const express = require('express');
const session = require('express-session');
require('dotenv').config();
const passport = require('passport');
const strategy = require(`${__dirname}/strategy.js`);

const app = express();
app.use( session({
  secret: 'sup dude',
  resave: false,
  saveUninitialized: false
}));
app.use( passport.initialize() );
app.use( passport.session() );
passport.use( strategy );

passport.serializeUser(function(user, done) {
    done(null, { id: user.id, display: user.displayName, nickname: user.nickname, email: user.emails[0].value });
  });
  
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  
  app.get( '/login',
  passport.authenticate('auth0',
    { successRedirect: '/me', failureRedirect: '/login', failureFlash: true }
  )
);

const port = 3000;
app.listen( port, () => { console.log(`Server listening with baited breath on port ${port}`); } );