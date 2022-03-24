const onlineOrderControll=require('../model/onlineOrder_schema')
const deliveryControll=require('../model/delivery_schema')



const onlineOrderDetails=(req,res)=>{
    try{
            onlineOrderControll.onlineOrderDetails.create(req.body, (err, data) => {
                console.log("line 9",data)
                if (err) throw err
                res.status(200).send({ message: data})
            
    })
}catch(err){
    res.status(500).send({message:err.message})
}
    
}
const getAllOnlineOrderDetails=(req,res)=>{
    try{
        onlineOrderControll.onlineOrderDetails.find({deleteFlag:'false'},(err,data)=>{
            if(err)throw err
            res.status(200).send(data)
        })
    }catch(err){
        res.status(400).send({message:err.message})
    } 
}
const getSingleOnlineOrderDetails=(req,res)=>{
    try{
        onlineOrderControll.onlineOrderDetails.findOne({_id:req.params.id,deleteFlag:"false"},(err,data)=>{
            if(err)throw err
            res.status(200).send(data)
        })
    }catch(err){
        res.status(500).send({message:err.message})}
}


const adminUpdateOnlineOrderDetails=(req,res)=>{
    //  var deliveryDetails={}
try{
    deliveryControll.deliveryRegister.findOne({_id:req.params.deliveryCandidateId,deleteFlag:"false"},{name:1,contact:1},(err,data)=>{
        console.log("line 18",data)
        if(data){
            req.body.deliveryCandidateName=data.name,
            req.body.candidateContactNumber=data.contact
            req.body.orderStatus="orderAccepted"
            console.log("line 23",req.body)
            onlineOrderControll.onlineOrderDetails.findOneAndUpdate({_id:req.params.orderId,deleteFlag:"false"},req.body,{new:true},(err,datas)=>{
                if(err)throw err
                console.log("line 26",datas)
                res.status(200).send({message:"update order details",datas})
            })
        }else{
            res.status(400).send("invalid Id")
        }
    })
}catch(err){
    res.status(500).send({message:err.message})
}
}
const deliveryCandidateUpdateOnlineOrderStatusDetails=(req,res)=>{
    try{
    deliveryControll.deliveryRegister.findOne({_id:req.params.deliveryCandidateId,deleteFlag:"false"},(err,data)=>{
        console.log("line 36",data)
        if(data){
            var Location={}
            console.log(data.deliveryLocation)
            console.log(data.name)
               Location.deliveryLatitude=data.deliveryLocation.deliveryLatitude
               Location.deliveryLongitude=data.deliveryLocation.deliveryLongitude
            
           req.body.deliveryLocation=Location
           req.body.orderStatus="orderTakeOver"
           console.log("line 40",req.body)
           onlineOrderControll.onlineOrderDetails.findOneAndUpdate({_id:req.params.orderId,deleteFlag:"false"},req.body,{new:true},(err,datas)=>{
               if(err)throw err
               console.log("line 43",datas)
               res.status(200).send({message:"update order details",datas})
           })
        }else{
            res.status(400).send('invalid id')
        }
    })
}catch(err){
    res.status(500).send({message:err.message})
}
}

const getAllOnlineOrderAcceptedDetails=(req,res)=>{
    try{
    onlineOrderControll.onlineOrderDetails.find({orderStatus:"orderAccepted",deleteFlag:'false'},(err,data)=>{
        if(err)throw err
        res.status(200).send(data)
    })
}catch(err){
    res.status(400).send({message:err.message})
}
}

const deliveryCandidateUpdateOnlineOrderDetails=(req,res)=>{
    try{
    deliveryControll.deliveryRegister.findOne({_id:req.params.deliveryCandidateId,deleteFlag:"false"},(err,data)=>{
        console.log("line 36",data)
        if(data){
        //    req.body.orderStatus="delivery finished"
        //    console.log("line 40",req.body)
           onlineOrderControll.onlineOrderDetails.findOneAndUpdate({_id:req.params.orderId},{$set:{deleteFlag:"true",orderStatus:"delivery finished"}},{new:true},(err,datas)=>{
               if(err)throw err
               console.log("line 43",datas)
               res.status(200).send({message:"update order details",datas})
           })
        }else{
            res.status(400).send('invalid id')
        }
    })
}catch(err){
    res.status(500).send({message:err.message})
}
}

module.exports={onlineOrderDetails,getAllOnlineOrderDetails,getSingleOnlineOrderDetails,     
    adminUpdateOnlineOrderDetails,getAllOnlineOrderAcceptedDetails,
    deliveryCandidateUpdateOnlineOrderStatusDetails,deliveryCandidateUpdateOnlineOrderDetails}