const ratingController = require("../model/rating_schema");
// const registerController = require('../model/register_admin_schema')
const restarauntControll = require("../model/restaraunt_enroll_schema");

const starRating = async (req, res) => {
  try {
    ratingController.Rating.create(req.body, (err, data) => {
      if (err) {
        throw err;
      } else {
        ratingController.Rating.countDocuments(
          { foodId: data.foodId },
          (err, num) => {
            if (err) {
              throw err;
            } else {
              console.log(num);
              const noOfPersons = num;
              ratingController.Rating.find(
                { foodId: data.foodId },
                { rating: 1, _id: 0 },
                (err, datas) => {
                  if (err) {
                    throw err;
                  } else {
                    console.log(datas);
                    console.log(typeof datas);
                    let a = 0;
                    for (var i = 0; i < datas.length; i++) {
                      a += datas[i].rating;
                    }
                    console.log(a);
                    const average = a / noOfPersons;
                    console.log(average);
                    restarauntControll.addAvaliableFood.findOneAndUpdate(
                      { _id: req.body.foodId },
                      { $set: { rating: average } },
                      { new: true },
                      (err, data) => {
                        if (err) {
                          throw err;
                        } else {
                          console.log(data);
                          res.status(200).send({ message: data });
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
      }
    });
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
}

const userLike = async (req, res) => {
 
  try{
  ratingController.like.create(req.body,(err,data)=>{
  if(err){throw err}
  else{
    if (req.body.dislike == 1) {
      ratingController.like.find({ foodId: data.foodId }, (err, data) => {
        if (err) {
          throw err;
        } else {
          console.log(data.length);
          var a = 0;
          for (var i = 0; i < data.length; i++) {
            a += data[i].like;
          }
          var b = 0;
          for (var j = 0; j < data.length; j++) {
            b += data[j].dislike;
          }
          console.log(a);
          console.log(b);
          res.status(200).send({ like: a, dislike: b });
        }
      });
    } else if (req.body.like == 1) {
      ratingController.like.find({ foodId: data.foodId }, (err, data) => {
        if (err) {
          throw err;
        } else {
          console.log(data.length);
          var a = 0;
          for (var i = 0; i < data.length; i++) {
            a += data[i].like;
          }
          var b = 0;
          for (var j = 0; j < data.length; j++) {
            b += data[j].dislike;
          }
          console.log(a);
          console.log(b);
          res.status(200).send({ like: a, dislike: b });
        }
      });
    }else{
      ratingController.like.find({ foodId: data.foodId }, (err, data) => {
        if (err) {
          throw err;
        } else {
          console.log(data.length);
          var a = 0;
          for (var i = 0; i < data.length; i++) {
            a += data[i].like;
          }
          var b = 0;
          for (var j = 0; j < data.length; j++) {
            b += data[j].dislike;
          }
          console.log(a);
          console.log(b);
          res.status(200).send({ like: a, dislike: b });

    }
  });
}

  }
})
  }catch(err){
    res.status(500).send({message:err.message})
  }
}
 

module.exports = { starRating, userLike }
