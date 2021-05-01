module.exports.authMiddleware = (req, res, next) => {
 if (req.user) {
     return next()
 }
 return res.status(401).send('Not Logged In');
}
