const mongoose = require('mongoose')

const connection=mongoose.connect('mongodb://localhost:27017/auth_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('connected to mongoDB');
}).catch(err => {
  console.log(err);
})



module.exports=connection
