
const express = require('express');
const  session = require('express-session');
const app = express();
const passport = require('passport');
 require('./auth');
 require('dotenv').config()
const PORT = process.env.PORT || 5000;

//Middle ware function
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }


  app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
  app.use(passport.initialize());
  app.use(passport.session());

app.get('/' , (req , res)=> {
    res.send('<a href = "/auth/google"> Authenticate  with Google');
})

app.get('/protected' ,isLoggedIn, (req , res) => {
    
    res.send(`Hi ${req.user.displayName}`);
})


app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));


app.get( '/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
}));


app.get('/auth/google/failure' , (req , res) =>{
    res.sendFile("SOmething went wronge");
})

app.get('/logout', (req, res) => {
    res.send('Goodbye!');
    req.logout();
    req.session.destroy();
   
  });

app.listen(PORT , () =>{
    console.log(`Server running on port ${PORT} .... `);
})