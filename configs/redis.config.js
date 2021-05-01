const redis=require('redis')

const client=redis.createClient()

client.on('connect',()=>{
  console.log('client connected to redis');
})

client.on('connect',()=>{
  console.log('client connected to redis');
})
client.on('error',(err)=>{
  console.log(err.message);
})

module.exports=client