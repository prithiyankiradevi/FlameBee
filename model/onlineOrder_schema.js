const mongoose = require('mongoose');

const restrauntSchema = mongoose.Schema({
  restarauntName: String,
  address: String,
  contact: String,
  cuisine: String,
  rating: Number,
  typeOfFood: String,
  // restarauntImage: String,
  // menuImage: String,
  userId: String,
  email: String,
  popularDishes: String,
  averageCost: String,
  location: String,
  deleteFlag: {
      type: String,
      default: 'false'
  }
})

const avaliableFoodSchema = mongoose.Schema({
  //foodImage: String,
  price: Number,
  offer: String,
  typeOfFood: String,
  foodName: String,
  rating:Number,
  restaurantDetails:[restrauntSchema],
  tax: String,
  amount: {
      type: Number,
      default: 1
  },
  deleteFlag: {
      type: String,
      default: 'false'
  }
})

const onlinePayment=mongoose.Schema({
    razorpay_payment_id:String,
    razorpay_order_id:String,
    razorpay_signature:String,
    entity: String,
    amount: Number,
    currency: String,
    amount_paid: Number,
    amount_due: Number,
    receipt: String,
    offer_id: String,
    status: String,
    attempts: Number,
    createdAt: Date

})
const onlineOrderSchema = mongoose.Schema({
    
orderId:String,
name:String,
contact:Number,
email:String,
address:String,
deliveryCandidateName:String,
candidateContactNumber:Number,
deliveryLocation:{
  type:Object,
  deliveryLatitude:Number,
  deliveryLongitude:Number
},
userId:String,
orderStatus:{
  type:String,
  default:"orderPending"
},
deleteFlag:{
  type:String,
  default:false
},
userLocation:{
  type:Object,
  userLatitude:Number,
  userLongitude:Number
},
total:Number,
role:{
    type:String,
    default:"online"
},
onlineCardPayment:[onlinePayment],
foodSchema:[avaliableFoodSchema]
   })

   const onlineOrderDetails=mongoose.model('onlineOrderSchema', onlineOrderSchema)

   module.exports={onlineOrderDetails}
