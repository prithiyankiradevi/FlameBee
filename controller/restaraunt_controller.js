const restarauntSchema = require('../model/restaraunt_enroll_schema')
const jwt = require('jsonwebtoken')
const userSchema = require('../model/register_admin_schema')
const paginated=require('./admin_controller')

const createRestarauntBySuper = (req, res) => {
    try{
    const token = jwt.decode(req.headers.authorization)
    const id = token.userid
    req.body.userId = id
    userSchema.adminSchema.findOneAndUpdate({ _id: id }, { $push: { role: 'owner' } }, { new: true }, (err, data) => {
        if (err) { throw err }
        else {
            console.log(req.body.email)
            restarauntSchema.addRestrauntByOwner.countDocuments({ email: req.body.email }, (err, data) => {
                if (data == 0) {
                    console.log(req.files)
                    console.log('line 10', req.files['restarauntImage'][0].path)
                    console.log('line 11', req.files['menuImage'][0].path)
                    // req.body.noOfPerson=1
                    req.body.restarauntImage = `http://192.168.0.112:8600/uploads/${req.files['restarauntImage'][0].filename}`
                    req.body.menuImage = `http://192.168.0.112:8600/uploads/${req.files['menuImage'][0].filename}`
                    restarauntSchema.addRestrauntByOwner.create(req.body, (err, data) => {
                        console.log(data)
                        if (err) throw err
                        res.status(200).send({ message: data, statusCode: 200 })
                    })
                } else { res.status(400).send({ message: 'email already exists' }) }
            })
        }
    })
}catch(err){
    res.status(500).send({message:err.message})
}
}

const getRestarauntByOwner = (req, res) => {
    try {
        const token = jwt.decode(req.headers.authorization)
        const verifyId = token.userid
        restarauntSchema.addRestrauntByOwner.find({ userId: verifyId, deleteFlag: "false" }, (err, data) => {
            if (err) {
                console.log('data does not exists')
                res.status(400).send({ message: 'authentication error' })
            }
            else {
                if (data) {
            //         const datas=paginated.paginated(data,req,res)
                console.log(data)
                    res.status(200).send({ message: data})
                }
            }
        })
    } catch (e) {
        res.status(500).send({ message: 'please check it again' })
    }
}

const textSearchRestaurantName = async (req, res) => {
    try{
    const s = await restarauntSchema.addRestrauntByOwner.findById(req.params.restaurantId)
    console.log('s', s)
    const givenId=s._id
    const z=await restarauntSchema.addAvaliableFood.find({givenId},{foodName:1,_id:0})
        // console.log(typeof(z))
        var datas=Object.values(z).filter((answer)=>answer["foodName"].toLowerCase().includes(req.body.foodName.toLowerCase()))
        console.log("your Search Details",datas)
        // var z = []
        // a.filter((datas) => {
        //     // console.log(datas)
        //     var k = datas["foodName"].includes(req.body.foodName)
        //     // console.log('k',k)
        //     if (k == true) {
        //         // console.log('data',datas)
        //         z.push(datas.foodName)
        //     }
        // })
    
    // const data=paginated.paginated(datas,req,res)
    // console.log(data)
    res.status(200).send(datas)
    }catch(err){
        res.status(500).send({message:err.message})
    }

}

const getAllRestaraunt = (req, res) => {
    try{
    restarauntSchema.addRestrauntByOwner.find({ deleteFlag: 'false' }, (err, data) => {
        if (err) {
             res.status(400).send({ message: 'unauthorized' }) }
        else {
            // const datas=paginated.paginated(data,req,res)
            // console.log(datas)
            // res.json(res.paginated)
        res.status(200).send({ message:data})
        }
    })
}catch(err){
    res.status(500).send({message:err.message})
}
}

const getByRestarauntId = (req, res) => {
    try{
    restarauntSchema.addRestrauntByOwner.findById({ _id: req.params.id, deleteFlag: 'false' }, (err, data) => {
        if (err) { res.status(400).send({ message: 'invalid id' }) }
        else {
            console.log(data)
            res.status(200).send({ message: data })
        }
    })
}catch(err){
    res.status(500).send({message:err.message})
}
}

const updateRestarauntByOwner = (req, res) => {
    console.log("line 116",req.body)
    console.log("line 117",req.params)
    try {
        const z = []
        const a = Object.entries(req.files).forEach((result) => {
            console.log("line 121",result[1][0])
            z.push(result[1][0])
        })
        if (z.length == 1) {
            if (z[0].fieldname == 'restarauntImage') {
                req.body.restarauntImage = `http://192.168.0.112:8600/uploads${z[0].filename}`
                req.body.menuImage=" "
            } else {
                req.body.menuImage = `http://192.168.0.112:8600/uploads${z[0].filename}`
                req.body.restarauntImage=" "
            }
        }
        else if (z.length == 2) {
            if (z[0].fieldname == 'restarauntImage') {
                req.body.restarauntImage = `http://192.168.0.112:8600/uploads${z[0].filename}`
                req.body.menuImage = `http://192.168.0.112:8600/uploads${z[1].filename}`
            } else {
                req.body.restarauntImage = `http://192.168.0.112:8600/uploads${z[1].filename}`
                req.body.menuImage = `http://192.168.0.112:8600/uploads${z[0].filename}`
            }
        }
console.log(req.body)
        restarauntSchema.addRestrauntByOwner.findOneAndUpdate({_id:req.params.id}, req.body, { new: true }, (err, data) => {
            if (err) { res.status(400).send({ message: 'invalid id' }) }
            else {
                console.log("line 143",data)
                res.status(200).send({ message: 'updated successfully', data })
            }
        })
    } catch (err) {
        res.status(500).send({ message: 'internal server error' })
    }
}

const deleteRestarauntByOwner = (req, res) => {
    console.log(req.params.id)
    try {
        restarauntSchema.addRestrauntByOwner.findByIdAndUpdate(req.params.id, { deleteFlag: "true" }, { returnOriginal: false }, (err, data) => {
            console.log(data)
            if (err) { res.status(400).send({ message: 'data does not deleted' }) }
            else {
                res.status(200).send({ message: 'data deleted successfully' })
            }
        })
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
}

const avaliableItems = async (req, res) => {
    try{
    const z = await restarauntSchema.addRestrauntByOwner.findById(req.body.restaurantId)
    console.log('z', z)
    req.body.restaurantDetails = z
    console.log("line155",req.file)
    req.body.foodImage = `http://192.168.0.112:8600/uploads/${req.file.filename}`
    console.log(req.file)
    restarauntSchema.addAvaliableFood.create(req.body, (err, data) => {
        if (err) { console.log(err) }
        else {
            console.log(data)
            res.status(200).send({ message: data, statusCode: 200 })
        }
    })
}catch(err){res.status(500).send({message:err.message})}
}

const getFoodItemsByOwner = (req, res) => {
    try{
    restarauntSchema.addAvaliableFood.find({ restaurantId: req.params.restaurantId, deleteFlag: 'false' }, (err, data) => {
        if (err) {
             res.status(400).send({ message: 'invalid restarauntid' }) }
        else {
            var count=data.length
            console.log(count)
            const datas=paginated.paginated(data,req,res)
            console.log(datas)
            res.status(200).send({ message: datas,count})
        }
    })
}catch(err){
    res.status(500).send({message:err.message})
}
}

const getByFoodId = (req, res) => {
    try{
    restarauntSchema.addAvaliableFood.findById({ _id: req.params.id, deleteFlag: 'false' }, (err, data) => {
        if (err) { res.status(400).send({ message: 'invalid id' }) }
        else {
            console.log(data)
            res.status(200).send({ message: data })
        }
    })
}catch(err){res.status(500).send({message:err.message})}
}

const getAllFood = (req, res) => {
    try{
    restarauntSchema.addAvaliableFood.find({ deleteFlag: 'false' }, (err, data) => {
        if (err) { res.status(400).send({ message: 'invalid id' }) }
        else {
            // const datas=paginated.paginated(data,req,res)
            // console.log(datas)
            res.status(200).send({ message: data})
        }
    })
}catch(err){res.status(500).send({message:err.message})}
}

const updateFood = (req, res) => {
    // const z = Object.entries(req.file).length
    console.log(req.file)
    // if(req.file==null||undefined) return
    if (req.file != null || undefined) {
        if ((req.file).fieldname == 'foodImage') {
            req.body.foodImage = `http://192.168.0.112:8600/uploads${(req.file).filename}`
        }
    }
    // const z=Object.entries(req.file).filter((result)=>{console.log('z',result)})
    // console.log(z)
    restarauntSchema.addAvaliableFood.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, data) => {
        if (err) { res.status(400).send({ message: 'invalid restarauntid' }) }
        else {
            console.log(data)
            res.status(200).send({ message: data, statusCode: 200 })
        }
    })
}

const deleteFoodItems = (req, res) => {
    restarauntSchema.addAvaliableFood.findByIdAndUpdate(req.params.id, { deleteFlag: "true" }, { new: true }, (err, data) => {
        if (err) { res.status(400).send({ message: 'data is not deleted yet' }) }
        else {
            console.log(data)
            res.status(200).send({ message: 'data deleted successfully' })
        }
    })
}

// const createRestaraunt = (req, res, next) => {
//     console.log(req.body)
//     const token = jwt.decode(req.headers.authorization)
//     const id = token.userid
//     console.log(id)
//     // res.file=null ||undefined?req.body.menuImage=" ":req.body.menuImage=req.body.file
//     if (req.file == null || undefined) {
//         req.body.menuImage = " "
//     } else {
//         res.body.menuImage = req.file.path
//     }
//     console.log(req.file)
//     restarauntSchema.addRestrauntByAdmin.create(req.body, (err, data) => {
//         res.status(200).send({ message: data })
//     })
//     // adminSchema.adminSchema.findOne({ _id: id }, (err, data) => {
//     //     console.log(data)
//     //     if (data != null) {
//     //         req.body.userId = data._id
//     //         console.log(req.body)
//     //         if (req.file==null||undefined) {
//     //             req.body.menuImage =" "
//     //         } else {
//     //             res.body.menuImage = req.file.path
//     //         }
//     //         console.log(req.file)
//     //         restarauntSchema.addRestrauntByAdmin.create(req.body, async (err, data) => {
//     //             if (err) {
//     //                 console.log(err)
//     //                 res.status(400).send({ message: 'unsuccess' })
//     //             }
//     //             else {
//     //                 // var k=await restarauntSchema.adminAddRestrauntSchema.findOne({ email: req.body.email }).populate('userAdminId',['name','email','restaurant_Name'])
//     //                 console.log('successful', data)
//     //                 res.status(200).send({ message: data })
//     //             }
//     //         })
//     //     } else {
//     //         res.send('email does not exists')
//     //     }
//     // })
// }



module.exports = {
    createRestarauntBySuper,
    getRestarauntByOwner,
    textSearchRestaurantName,
    getAllRestaraunt,
    getByRestarauntId,
    updateRestarauntByOwner,
    deleteRestarauntByOwner,
    avaliableItems,
    getFoodItemsByOwner,
    getByFoodId,
    getAllFood,
    updateFood,
    deleteFoodItems
}