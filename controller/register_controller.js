const nodemailer = require('nodemailer')
const { otpSchemas } = require('../model/otp_schema')
const bcrypt = require('bcrypt')
const { randomString } = require('../controller/random_string')
const { registerSchema, loginSchema } = require('../model/register_admin_schema')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')

exports.userRegistration = ((req, res, next) => {
    try {
        const errors = validationResult(req.body)
        if (!errors.isEmpty()) res.json({ message: errors.array() })
        else {
            // someother(req,res,next)
            registerSchema.countDocuments({ email: req.body.email }, async (err, num) => {
                console.log(num)
                if (num == 0) {
                    req.body.password = await bcrypt.hashSync(req.body.password, 10)
                    console.log(req.file)
                    req.body.profileImage = req.file.path
                    registerSchema.create(req.body, (err, data) => {
                        res.json({ data: data })
                    })
                }
                else { res.send({ message: 'Data already exists', error: err }) }
            })
        }
    } catch (err) {
        res.send(err.message)
    }
})

exports.login = (req, res, next) => {
    try {
        registerSchema.findOne({ email: req.body.email }, async (err, data) => {
            // console.log(data)
            if (data) {
                const password = await bcrypt.compare(req.body.password, data.password)
                // console.log(password)
                if (password === true) {
                    console.log(data._id);
                    const token = await jwt.sign({ userid: data._id }, process.env.SECRET_KEY)
                    const text = `http://localhost:8600/post/${data._id}/${token}`
                    postMail(data.email, 'welcome again', text)
                    res.send({ message: 'verification link send to your email', token })
                }
                else { res.send('invalid password') }
            }
            else {
                res.send({
                    message: 'invalid email/password ', data: {
                        email: req.body.email,
                        password: req.body.password
                    }
                })
            }
        })
    } catch (error) {
        res.send(error)
    }
}

exports.forgotPassword = async (req, res, next) => {
    try {
        if (req.body.otp != null) {
            otpSchemas.findOne({ otp: req.body.otp }, (err, data) => {
                if (data) {
                    console.log(data, 'line inside otp schema data 71')
                    const token = jwt.decode(req.headers.authorization)
                    console.log(token)
                    const verifyId = token.userid
                    console.log(verifyId)
                    console.log(req.body.otp)
                    registerSchema.findOne({ _id: verifyId }, (err, data) => {
                        if (data) {
                            if (req.body.email === data.email) {
                                // console.log(data.email)
                                if (req.body.newPassword === req.body.confirmPassword) {
                                    // console.log(req.body.newPassword)
                                    req.body.newPassword = bcrypt.hashSync(req.body.newPassword, 10)
                                    registerSchema.findOneAndUpdate({ _id: verifyId }, { password: req.body.newPassword }, (err, data) => {
                                        if (err) { res.send('update failed') }
                                        else {
                                            console.log(data)
                                            res.send(data)
                                        }
                                    })
                                } else { res.send('password does not match') }
                            } else { res.send('email does not match') }
                        }
                    })
                } else { res.send('we wont give otp') }
            })

        } else {
            const token = jwt.decode(req.headers.authorization)
            const verifyId = token.userid
            console.log(verifyId)
            registerSchema.findOne({ _id: verifyId }, (err, data) => {
                console.log(data)
                if (data) {
                    if (req.body.email === data.email) {
                        const otp = randomString(3)
                        console.log(otp)
                        otpSchemas.create({ userId: verifyId, otp: otp }, (err, data) => {
                            if (err) { console.log(err.message, 'line 96') }
                            console.log(data._id)
                            res.send(data)
                        })
                        postMail(data.email, 'otp for changing password', otp)
                        setTimeout(() => {
                            console.log('time out fun startyed')
                            // console.log(data_id)
                            otpSchemas.findOneAndDelete({ otp: otp }, (err, data) => {
                                console.log('line 115 check otpSchema', data)
                                if (err) throw err
                            })
                        }, 20000);

                    } else { res.send('email did not match') }
                } else { res.send({ message: 'Aunthentication failed', err }) }
            })
        }
    } catch (error) {
        console.log(error.message)
        res.send('error')
    }
}

async function someother(req, res, next) {
    // const fullName=req.body.fullName
    const f = await registerSchema.registerSchemaa.find({}, { country: 1, _id: 0, fullName: 1 })
    console.log(f)
    console.log('--------------------------------------------------------')
    f.filter((fun) => {
        console.log(req.body.fullName)


        var k = fun['country'].includes(req.body.country)
        console.log(k)
        if (k == true) {
            console.log('inside if')
            console.log(fun)


        }
        else {
            console.log('not in range')
        }

        //   console.log(fun['fullName'])   
    })
    //  console.log(g)

    // ,(err,data)=>{
    //       if(err)console.log(err)
    //       else{
    //           console.log(data)
    //       }
    //   })
    //     console.log(f[0])
    // _id:0,
    // _v:0
    // },(err,data)=>{
    //     if(err) res.send(err.message)
    //     console.log('success')
    //     res.send(data)
    // }).limit(3)
}

let transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'pravindev00@gmail.com',
        pass: 'devpravin00'
    }
})
const postMail = function ( to, subject, text) {
    return transport.sendMail({
        from: 'pravindev00@gmail.com',
        to: to,
        subject: subject,
        text: text
    })
}


