const User=require('../models/User.model')
const mongoose=require('mongoose')

module.exports.registerUser=async(req,res,next)=>{
  try {
    const doesUserExist=await User.findOne({email:req.body.email}) 
    if(doesUserExist){
      throw (createError.Conflict(`${req.body.email} already exists`))
    }
    const user=new User(req.body)
    const savedUser=await user.save()
    res.send(savedUser)
  } catch (error) {
    next(error)
  }
}
