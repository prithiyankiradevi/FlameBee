const router=require('express').Router()
const schemaForBothSuperAndAdmin=require('../controller/admin_controller')
const valid=require('../model/register_admin_schema')
const multer=require('../middleware/multer')


//for admin
router.post('/register',valid.validation,schemaForBothSuperAndAdmin.register)
router.post('/login',schemaForBothSuperAndAdmin.login)
router.get('/getAllUser',schemaForBothSuperAndAdmin.getAllOwnersUser)
router.get('/getByOwnerId',schemaForBothSuperAndAdmin.getByOwnerUserId)
router.put('/updateOneUser',schemaForBothSuperAndAdmin.updateOwnerUser)
router.delete('/deleteUser',schemaForBothSuperAndAdmin.deleteOwnerUser)



module.exports=router