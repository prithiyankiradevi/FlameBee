const mongoose = require('mongoose')
const { check } = require('express-validator')
const { captureRejectionSymbol } = require('events')




const registerSchema = mongoose.Schema({
    name: String,
    email: String,
    contact: {
        type: String,
        // index: { unique: true, sparse: true }
    },
    password: String,
    deleteFlag: {
        type: String,
        default: false
    }
})
const otpSchema = mongoose.Schema({
    // userId: {
    //     type: String
    // },
    otp: Number
})

const forgotPassword = mongoose.Schema({
    confirmPassword: {
        type: String
    },
    email: {
        type: String,
    },
    password: {
        type: String
    }
})



const adminSchema = mongoose.model('adminSchema', registerSchema)
const sendOtp = mongoose.model('sendOtpSchema', otpSchema)
const loginSchema = mongoose.model("loginSchema", forgotPassword)


const validation = [
    check('email').trim().isEmail().withMessage('email  must be valid'),
    check('password').isLength({ min: 5}).withMessage('password must be minimum 5 character')
    
]

module.exports = { adminSchema, validation, loginSchema,sendOtp }