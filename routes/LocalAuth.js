const router=require('express').Router()
const passport=require('passport')
const { registerUser, privateRoute, logoutUser } = require('../controller/localAuth.controller');
const { authMiddleware } = require('../middlewares/authMiddleWare');


router.post('/register',registerUser)
router.post('/login',passport.authenticate('local',{ failureRedirect: '/login-failure', successRedirect: 'login-success' }))
router.get('/private',authMiddleware,privateRoute)

router.get("/logout",logoutUser );
module.exports =router