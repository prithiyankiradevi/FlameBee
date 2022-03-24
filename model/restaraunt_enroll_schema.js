const mongoose = require('mongoose')

const restrauntSchema = mongoose.Schema({
    restarauntName: String,
    address: String,
    contact: String,
    cuisine: String,
    rating: Number,
    typeOfFood: String,
    restarauntImage: String,
    menuImage: String,
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
    foodImage: String,
    price: Number,
    offer: String,
    typeOfFood: String,
    foodName: String,
    rating:String,
    like:Number,
    dislike:Number,
    restaurantDetails: {
        type: Object
    },
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


const addAvaliableFood = mongoose.model('avaliableFood', avaliableFoodSchema)
const addRestrauntByOwner = mongoose.model('restrauntSchema', restrauntSchema)

module.exports = { addRestrauntByOwner, addAvaliableFood }
