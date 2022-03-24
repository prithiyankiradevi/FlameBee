
const mongoose=require('mongoose')

const locationSchema=mongoose.Schema({
    locationId:{
        type:String,
        require:true
    },
    //areaName:String,
    userLocation:{
    userLatitude:Number,
    userLongitude:Number
    },
  createdAt:{
          type:Date,
          default:Date.now()
      },
      deleteFlag:{
        type:String,
        default:false
      }
     
})
const userAndDeliveryCandidateDetailToAdmin=mongoose.Schema({
  UserName:String,
  totalAmount:Number,
  foodName:String,
  deliveryCandidateId:String,
  deliveryLocation:{
    type:Object,
    deliveryLatitude:Number,
    deliveryLongitude:Number,
  },
userLocation:{
  userLatitude:Number,
  userLongitude:Number,
}
 
})

const locationToDelivery=mongoose.model("locationSchema",locationSchema)
const userAndDeliveryCandidateDetail=mongoose.model('userAndDeliveryCandidateDetail',userAndDeliveryCandidateDetailToAdmin)


module.exports={locationToDelivery,userAndDeliveryCandidateDetail}