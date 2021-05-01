const express = require('express')
const createError = require('http-errors')
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const authRoutes=require('./routes/facebookAuth.route')

require('./configs/mongodb.config')
require('dotenv').config()
require('./utils/authStrategies/facebookAuthStrategy');



const app = express()
app.use(express.json())
app.use(cookieParser())

const sessionStore =  MongoStore.create({ mongoUrl: 'mongodb://localhost:27017/auth_db', collection: 'sessions' });

app.use(session({
  secret: process.env.COOKIE_SECRETE,
  resave: false,
  saveUninitialized: true,
  store: sessionStore,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 
  }
}));

app.use(cookieParser(process.env.COOKIE_SECRETE));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth',authRoutes)

app.use(async(req,res,next)=>{
  next(createError.NotFound('This Route does not exists'))
})

app.use((err,req,res,next)=>{
  res.status(err.status||500).send({error:{status:err.status || 500,message:err.message}})

})

app.listen(process.env.PORT || 4000, () => {
  console.log('server running on port 4000');
})