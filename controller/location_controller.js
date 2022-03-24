
// const locationController=require('../model/location_schema')
//const geolib = require('geolib')
// const cardSchema=require('../model/card_schema')
// const onlineCardSchema=require('../model/onlineCard_Schema')

const orderSchema=require('../model/order_schema')
const onlineOrderSchema=require('../model/onlineOrder_schema')

const deliverySchema=require('../model/delivery_schema')

const onlineOrderLocation=async(req,res,)=>{
    try{
            onlineOrderSchema.onlineOrderDetails.findOne({userId:req.params.UserId,deleteFlag:"false"},async(err,data)=>{
            console.log(data)
                if(data){
                    const emptyarr=[]
                    const z=await deliverySchema.deliveryRegister.find({deleteFlag:"false"})
                        console.log('line 32',z)
                        for(var i=0;i<z.length;i++){
            if(z[i].deliveryLocation.deliveryLatitude==data.userLocation.userLatitude){
                if(z[i].deliveryLocation.deliveryLongitude==data.userLocation.userLongitude){
                    emptyarr.push(z[i])
                    console.log('line 38',z[i])
                    res.status(200).send(emptyarr)
                    
                }
            }
        }
            }else{
                console.log('location mismatch')
                res.status(400).send({message:'location mismatch'})
            }
            })    

}catch(err){
    res.status(500).send({message:err.message})
}
        }
const orderLocation=async(req,res)=>{
    try{
        orderSchema.order.findOne({userId:req.params.UserId,deleteFlag:"false"},async(err,data)=>{
        console.log(data)
            if(data){
                const emptyarr=[]
                const z=await deliverySchema.deliveryRegister.find({deleteFlag:"false"})
                    console.log('line 32',z)
                    for(var i=0;i<z.length;i++){
        if(z[i].deliveryLocation.deliveryLatitude==data.userLocation.userLatitude){
            if(z[i].deliveryLocation.deliveryLongitude==data.userLocation.userLongitude){
                emptyarr.push(z[i])
                console.log('line 38',z[i])
                res.status(200).send(emptyarr)
                
            }
        }
    }
        }else{
            console.log('location not match')
            res.status(400).send({message:'location mismatch'})
        }
        })    }catch(err){
            res.status(400).send({message:err.message})
        }
}

// const getUserDetailAndAssignDeliveryCandidate=(req,res)=>{
//     try{     
//             cardSchema.cardDetails.findOne({_id:req.params.id,deleteFlag:"false"},(err,datas)=>{
//             if(datas==null){
//                 onlineCardSchema.onlineCardDetails.findOne({_id:req.params.id,deleteFlag:"false"},(err,data)=>{
//                     if(err)throw err
//                     res.status(200).send(data)
//                 })
//             }else{
//                 if(err)throw err
//                 res.status(200).send(datas)
//             }   
//         })
            
//     }catch(err){
//         res.status(500).send({message:err.message})
//     }
//         }



module.exports={onlineOrderLocation,orderLocation}
