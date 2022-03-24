const mongoose = require('mongoose')

const registerSchema = mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role:{
        type:String,
        default:"superadmin"
    }
})

const register=mongoose.model('registerSchema',registerSchema)

module.exports={register}