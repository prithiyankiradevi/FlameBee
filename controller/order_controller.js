const orderControll=require('../model/order_schema')
const deliveryControll=require('../model/delivery_schema')


const orderDetails=(req,res)=>{
    try{
            orderControll.order.create(req.body, (err, data) => {
                console.log(data)
                if (err) throw err
                res.status(200).send({ message: data})
            
    })
}catch(err){
    res.status(500).send({message:err.message})
}
    
}
const getAllOrderDetails=(req,res)=>{
    try{
        orderControll.order.find({deleteFlag:'false'},(err,data)=>{
            if(err)throw err
            res.status(200).send(data)
        })
    }catch(err){
        res.status(400).send({message:err.message})
    } 
}
const getSingleOrderDetails=(req,res)=>{
    try{
        orderControll.order.findOne({_id:req.params.id,deleteFlag:"false"},(err,data)=>{
            if(err)throw err
            res.status(200).send(data)
        })
    }catch(err){
        res.status(500).send({message:err.message})}
}

const adminUpdateOrderDetails=(req,res)=>{
    //  var deliveryDetails={}
    try{
    deliveryControll.deliveryRegister.findOne({_id:req.params.deliveryCandidateId,deleteFlag:"false"},{name:1,contact:1},(err,data)=>{
        console.log("line 18",data)
        if(data){
            req.body.deliveryCandidateName=data.name,
            req.body.candidateContactNumber=data.contact
            req.body.orderStatus="orderAccepted"
            console.log("line 23",req.body)
            orderControll.order.findOneAndUpdate({_id:req.params.orderId,deleteFlag:"false"},req.body,{new:true},(err,datas)=>{
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
const deliveryCandidateUpdateStatusDetails=(req,res)=>{
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
           orderControll.order.findOneAndUpdate({_id:req.params.orderId,deleteFlag:"false"},req.body,{new:true},(err,datas)=>{
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

const getAllOrderAcceptedDetails=(req,res)=>{
    try{
    orderControll.order.find({orderStatus:"orderAccepted",deleteFlag:'false'},(err,data)=>{
        if(err)throw err
        res.status(200).send(data)
    })
}catch(err){
    res.status(400).send({message:err.message})
}
}

const deliveryCandidateUpdateOrderDetails=(req,res)=>{
    try{
    deliveryControll.deliveryRegister.findOne({_id:req.params.deliveryCandidateId,deleteFlag:"false"},(err,data)=>{
        console.log("line 36",data)
        if(data){
           //req.body.orderStatus="delivery finished"
           console.log("line 40",req.body)
           orderControll.order.findOneAndUpdate({_id:req.params.orderId},{$set:{deleteFlag:"true",orderStatus:"delivery finished"}},{new:true},(err,datas)=>{
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



module.exports={orderDetails,getAllOrderAcceptedDetails,getAllOrderDetails,getSingleOrderDetails,
    adminUpdateOrderDetails,deliveryCandidateUpdateStatusDetails,deliveryCandidateUpdateOrderDetails}