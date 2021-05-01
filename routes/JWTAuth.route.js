const router=require('express').Router()
const { registerUser, loginUser, refreshToken, logOutUser } = require('../controller/authJWT.controller')
const {VerifyAccessToken}=require('../utils/jwt_helper')
router.post('/register',registerUser)

router.post('/login',loginUser)
router.post('/refreshToken',refreshToken)
router.delete('/logout',logOutUser)

module.exports=router