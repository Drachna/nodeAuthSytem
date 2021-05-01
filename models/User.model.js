const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt()
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

userSchema.statics.isPasswordValid = async (password,email) => {
  try {
    const user = await User.findOne({ email:email })
    return await bcrypt.compare(password, user.password)
  } catch (error) {
    throw error
  }
}
const User = mongoose.model('user', userSchema)
module.exports = User