const router=require('express').Router()
const superAdmin=require('../controller/superAdmin_controller')
const valid=require('../model/register_admin_schema')

router.post('/superAdminRegister',valid.validation,superAdmin.superAdminRegistration)
router.post('/superAdminLogin',valid.validation,superAdmin.superAdminLogin)

module.exports=router