const router=require('express').Router()
const passport=require('passport')
const { authMiddleware } = require('../middlewares/authMiddleWare')

router.get('/facebook',passport.authenticate('facebook'))
router.get('/error', (req, res) => res.send('Unknown Error'))
router.get('/private',authMiddleware, (req, res) => res.send('Congrats you can see the private route'))
router.get('/facebook/callback',passport.authenticate('facebook', { failureRedirect: '/login' }),
function(req, res) {
   res.redirect('/');
});

module.exports =router