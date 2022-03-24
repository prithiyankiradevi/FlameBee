const router=require('express').Router()

const orderControllDetails=require('../controller/order_controller')

router.post('/createOrderDetails',orderControllDetails.orderDetails)
router.get('/getAllOrderDetails',orderControllDetails.getAllOrderDetails)
router.get('/getSingleOrderDetails/:id',orderControllDetails.getSingleOrderDetails)

router.put('/adminUpdateOrderDetails/:deliveryCandidateId/:orderId',orderControllDetails.adminUpdateOrderDetails)
router.get('/getAllOrderAcceptedDetails',orderControllDetails.getAllOrderAcceptedDetails)

router.put('/deliveryCandidateUpdateStatusDetails/:deliveryCandidateId/:orderId',orderControllDetails.deliveryCandidateUpdateStatusDetails)
router.put('/deliveryCandidateUpdateOrderDetails/:deliveryCandidateId/:orderId',orderControllDetails.deliveryCandidateUpdateOrderDetails)

module.exports=router