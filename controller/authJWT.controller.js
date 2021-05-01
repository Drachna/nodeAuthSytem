const User = require("../models/User.model")
const createError = require('http-errors')
const { SignAcessToken, SignRefreshToken, VerifyRefreshToken } = require("../utils/jwt_helper")
const client=require('../configs/redis.config')
module.exports.registerUser = async (req, res, next) => {
  try {
    const userExists = await User.findOne({ email: req.body.email })
    if (userExists) {
      throw (createError.Conflict(`${req.body.email} already exists`))
    }
    const user = new User(req.body)
    const savedUser = await user.save()
    const accessToken = await SignAcessToken(savedUser.id)
    const refreshToken = await SignRefreshToken(savedUser.id)
    res.send({ accessToken,refreshToken })
  } catch (error) {
    next(error)
  }
}

module.exports.loginUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      throw (createError.NotFound('User not Found'))
    }

    const isPasswordMatching = await User.isPasswordValid(req.body.password,req.body.email)
    if (!isPasswordMatching) {
      throw (createError.Unauthorized('UserName/password not valid'))
    }
    const accessToken = await SignAcessToken(user.id)
    const refreshToken = await SignRefreshToken(user.id)
    res.send({ accessToken,refreshToken })
  } catch (error) {
    next(error)
  }
}

module.exports.refreshToken=async(req,res,next)=>{
  try {
    const {refreshToken}=req.body
  if(!refreshToken){
    throw createError.BadRequest()
  }
  const userId=await VerifyRefreshToken(refreshToken)
  const accessToken=await SignAcessToken(userId)
  const newRefreshToken=await SignRefreshToken(userId)
  res.send({accessToken,newRefreshToken})
  } catch (error) {
    next(error)
  }
  
}

module.exports.logOutUser=async(req,res,next)=>{
  try {
    const { refreshToken } = req.body
    if (!refreshToken) throw createError.BadRequest()
    const userId = await VerifyRefreshToken(refreshToken)
    client.DEL(userId, (err, val) => {
      if (err) {
        console.log(err.message)
        throw createError.InternalServerError()
      }
      res.sendStatus(204)
    })
  } catch (error) {
    next(error)
  }
}