const JWT = require('jsonwebtoken')
const createError = require('http-errors')
const client=require('../configs/redis.config')
module.exports = {
  SignAcessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secrete = process.env.ACCESS_TOKEN_SECRETE
      const options = {
        expiresIn: '1h',
        issuer: 'rachna.devasthali',
        audience: userId.toString()
      }

      JWT.sign(payload, secrete, options, (err, token) => {
        if (err) {
          return reject(err)
        }
        return resolve(token)
      })
    })
  },
  SignRefreshToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {}
      const secrete = process.env.REFRESH_TOKEN_SECRETE
      const options = {
        expiresIn: '1y',
        issuer: 'rachna.devasthali',
        audience: userId
      }

      JWT.sign(payload, secrete, options, (err, token) => {
        if (err) {
          return reject(err)
        }
        client.set(userId,token,'EX',365*24*60*60,(err,reply)=>{
          if(err){
            console.log(err.message);
             reject(createError.InternalServerError())
             return
          }
          resolve(token)
        })
      })
    })
  },
  VerifyAccessToken: (req, res, next) => {
    if (!req.headers['authorization'])
      return next(createError.Unauthorized())

    const token = req.headers['authorization'].split(' ').pop()
    JWT.verify(token, process.env.ACCESS_TOKEN_SECRETE, (err, payload) => {
      if (err) {
        if (err.name === 'JsonWebTokenError')
          return next(createError.Unauthorized())
        return next(createError.Unauthorized(err.message))
      }
      req.payload = payload
    })
  },
  VerifyRefreshToken: (refreshToken) => {
  return new Promise((resolve,reject)=>{
    JWT.verify(refreshToken, process.env.REFRESH_TOKEN_SECRETE, (err, payload) => {
      if (err) {
        if (err.name === 'JsonWebTokenError')
          return reject(createError.Unauthorized())
        return reject(createError.Unauthorized(err.message))
      }
      const userId = payload.aud
      client.GET(userId, (err, result) => {
        if (err) {
          console.log(err.message)
          reject(createError.InternalServerError())
          return
        }
        if (refreshToken === result) return resolve(userId)
        reject(createError.Unauthorized())
      })
    })
  })
  },
}
