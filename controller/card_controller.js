const cardSchema = require('../model/card_schema')
const onlinecardPaymentSchema=require('../model/onlineCard_Schema')
// const jwt = require('jsonwebtoken')
const userSchema = require('../model/register_admin_schema')
// const paginated=require('./admin_controller')

const createCardDetails = (req, res) => {
    userSchema.adminSchema.findOne({ email:req.body.email},(err, data) => {
        if (err) { throw err }
        else {
            console.log(req.body.email)
            cardSchema.cardDetails.countDocuments({ email: req.body.email }, (err, data) => {
                if (data == 0) {
                    // console.log(req.files)
                    //  console.log('line13',req.files['foodImage'][0].path)
                    // console.log('line 10', req.files['restarauntImage'][0].path)
                    // console.log('line 11', req.files['menuImage'][0].path)
                    // req.body.noOfPerson=1
                    // req.body.foodImage = `http://192.168.0.112:8600/uploads/${req.files['foodImage'][0].filename}`
                    // req.body.restarauntImage = `http://192.168.0.112:8600/uploads/${req.files['restarauntImage'][0].filename}`
                    // req.body.menuImage = `http://192.168.0.112:8600/uploads/${req.files['menuImage'][0].filename}`
                    cardSchema.cardDetails.create(req.body, (err, data) => {
                        console.log(data)
                        if (err) throw err
                        res.status(200).send({ message: data, statusCode: 200 })
                    })
                } else { res.status(400).send({ message: 'email already exists' }) }
            })
        }
    })
}
const getAllCardDetails=(req,res)=>{
    try{
        cardSchema.cardDetails.find({ deleteFlag: 'false' }, (err, data) => {
            if (err) {
                 res.status(400).send({ message: 'unauthorized' }) }
            else {
                // const datas=paginated.paginated(data,req,res)
                // console.log(datas)
                // res.json(res.paginated)
            res.status(200).send({ message:data})
            }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
const getSingleUserCardDetails=(req,res)=>{
    try{
        cardSchema.cardDetails.findOne({_id:req.params.id,deleteFlag:'false'},(err,data)=>{
            if(err){
                res.status(400).send({message:'unauthorized'})
            }else{
                res.status(200).send({message:data})
            }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}


//online card payment

const createOnlineCardDetails = (req, res) => {
    try{
    userSchema.adminSchema.findOne({ email:req.body.email},(err, data) => {
        if (err) { throw err }
        else {
            console.log(req.body.email)
            onlinecardPaymentSchema.onlineCardDetails.countDocuments({ email: req.body.email }, (err, data) => {
                if (data == 0) {
                    onlinecardPaymentSchema.onlineCardDetails.create(req.body, (err, data) => {
                        console.log(data)
                        if (err) throw err
                        res.status(200).send({ message: data, statusCode: 200 })
                    })
                } else { res.status(400).send({ message: 'email already exists' }) }
            })
        }
    })
}catch(err){
    res.status(500).send({message:err.message})
}
}
const getAllOnlineCardDetails=(req,res)=>{
    try{
        onlinecardPaymentSchema.onlineCardDetails.find({ deleteFlag: 'false' }, (err, data) => {
            if (err) {
                 res.status(400).send({ message: 'unauthorized' }) }
            else {
                // const datas=paginated.paginated(data,req,res)
                // console.log(datas)
                // res.json(res.paginated)
            res.status(200).send({ message:data})
            }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}
const getSingleUserOnlineCardDetails=(req,res)=>{
    try{
        onlinecardPaymentSchema.onlineCardDetails.findOne({_id:req.params.id,deleteFlag:'false'},(err,data)=>{
            if(err){
                res.status(400).send({message:'unauthorized'})
            }else{
                res.status(200).send({message:data})
            }
        })
    }catch(err){
        res.status(500).send({message:err.message})
    }
}


module.exports={createCardDetails,createOnlineCardDetails,
    getAllCardDetails,getSingleUserCardDetails,getAllOnlineCardDetails,getSingleUserOnlineCardDetails}