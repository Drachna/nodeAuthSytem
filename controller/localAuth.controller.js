const User = require('../models/User.model')

module.exports.registerUser = async (req, res, next) => {
  try {
    const doesUserExist = await User.findOne({ email: req.body.email })
    if (doesUserExist) {
      throw (createError.Conflict(`${req.body.email} already exists`))
    }
    const user = new User(req.body)
    const savedUser = await user.save()
    res.send(savedUser)
  } catch (error) {
    next(error)
  }
}


module.exports.privateRoute = async (req, res, next) => {
  res.send('congrats you can access private route now!!!')
}


module.exports.logoutUser = async (req, res, next) => {
  req.logout();
  res.send('logged out')
}
