const router=require('express').Router()
const cardControl=require('../controller/card_controller')

//cash on delivery
router.post('/createCard',cardControl.createCardDetails)
router.get('/getAllCardList',cardControl.getAllCardDetails)
router.get('/getSingleUserCardDetails/:id',cardControl.getSingleUserCardDetails)
//online payment
router.post('/createOnlineCardPayment',cardControl.createOnlineCardDetails)
router.get('/getAllOnlineCardList',cardControl.getAllOnlineCardDetails)
router.get('/getSingleUserOnlineCardDetails/:id',cardControl.getSingleUserOnlineCardDetails)


module.exports=router