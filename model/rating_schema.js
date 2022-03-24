const mongoose = require('mongoose');

const ratingSchema = mongoose.Schema({
   foodId:String,
    rating: {
        type: Number,
        default: 0
    },
    noOfPersons:{
        type:Number,
        default:0
    }

})
const likeSchema=mongoose.Schema({
    foodId:String,
    like:{
        type:Number,
        default:0
    },
    dislike:{
        type:Number,
        default:0
    }
    // noOfPersons:{
    //     type:Number,
    //     default:0
    // }
})

const Rating = mongoose.model('Rating', ratingSchema);
const like=mongoose.model('likeSchema',likeSchema)

module.exports = {Rating,like}