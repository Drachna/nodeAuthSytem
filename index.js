const express = require('express')
const createError = require('http-errors')
const JWTAuthRoutes=require('./routes/JWTAuth.route')

require('dotenv').config()
require('./configs/mongodb.config')
require('./configs/redis.config')

const app = express()
app.use(express.json())

app.use('/jwt/auth',JWTAuthRoutes)

app.use(async(req,res,next)=>{
  next(createError.NotFound('This Route does not exists'))
})

app.use((err,req,res,next)=>{
  res.status(err.status||500).send({error:{status:err.status || 500,message:err.message}})

})

app.listen(process.env.PORT || 4000, () => {
  console.log('server running on port 4000');
})