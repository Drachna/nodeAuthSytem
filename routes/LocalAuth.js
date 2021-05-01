const router=require('express').Router()
const passport=require('passport')

router.post('/register',)
router.post('/login',passport.authenticate('local',{ failureRedirect: '/login-failure', successRedirect: 'login-success' }))
router.delete('/logout',)