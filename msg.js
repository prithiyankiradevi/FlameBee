const authToken = "39fca37f039852d1637e23bb92316854";
const accountSid = "ACc697398f3c8b34057791cc15355c4062"

const client  =  require("twilio")(accountSid,authToken)

client.messages.create({
    body: 'hai dhanalakshmi welcome to twilio',
    to: '+15204426904',
    from: '+916369200214'
  }).then(message => console.log(message)).catch(err=>{
      console.log(err)
  })