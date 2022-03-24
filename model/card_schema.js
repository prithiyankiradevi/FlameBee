const mongoose=require('mongoose')


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
    // foodImage: String,
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

const cardDetailSchema=mongoose.Schema({
name:String,
contact:Number,
email:String,
address:String,
userId:String,
userLocation:{
    userLatitude: Number,
    userLongitude:Number,
},

// LocationAccuracy:Number,
total:Number,
role:{
    type:String,
    default:"cash"
},
foodSchema:[avaliableFoodSchema]

})
const cardDetails=mongoose.model("cardDetailSchema",cardDetailSchema)

module.exports={cardDetails}