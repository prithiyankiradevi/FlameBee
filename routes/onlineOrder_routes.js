const router=require('express').Router()

const orderOnlineControllDetails=require('../controller/onlineOrder_controller')

router.post('/createOnlineOrderDetails',orderOnlineControllDetails.onlineOrderDetails)
router.get('/getAllOnlineOrderDetails',orderOnlineControllDetails.getAllOnlineOrderDetails)
router.get('/getSingleOnlineOrderDetails/:id',orderOnlineControllDetails.getSingleOnlineOrderDetails)

router.put('/adminUpdateOnlineOrderDetails/:deliveryCandidateId/:orderId',orderOnlineControllDetails.adminUpdateOnlineOrderDetails)
router.get('/getAllOnlineOrderAcceptedDetails',orderOnlineControllDetails.getAllOnlineOrderAcceptedDetails)

router.put('/deliveryCandidateUpdateOnlineOrderStatusDetails/:deliveryCandidateId/:orderId',orderOnlineControllDetails.deliveryCandidateUpdateOnlineOrderStatusDetails)
router.put('/deliveryCandidateUpdateOnlineOrderDetails/:deliveryCandidateId/:orderId',orderOnlineControllDetails.deliveryCandidateUpdateOnlineOrderDetails)

module.exports=router