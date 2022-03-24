const router=require('express').Router()
const locate=require('../controller/location_controller')

router.get('/onlineOrderLocation/:UserId',locate.onlineOrderLocation)
router.get('/orderLocation/:UserId',locate.orderLocation)



//router.get('/getUserDetailAndAssignDeliveryCandidate/:id',locate.getUserDetailAndAssignDeliveryCandidate)




module.exports=router