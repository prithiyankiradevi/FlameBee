const router=require('express').Router()
const restarauntControl=require('../controller/restaraunt_controller')
const multer=require('../middleware/multer')

// router.get('/getRestarauntList',restarauntControl.listRestarauntName)
router.post('/createRestaurant',multer.upload.fields([{name:'restarauntImage',maxCount:1},{name:'menuImage',maxCount:1}]),restarauntControl.createRestarauntBySuper)
router.get('/getSpecificRestaurantCreatedByOwner',restarauntControl.getRestarauntByOwner)
router.get('/textSearchRestaurantName/:restaurantId',restarauntControl.textSearchRestaurantName)
router.get('/getAllRestaurant',restarauntControl.getAllRestaraunt)
// router.get('/getAllRestarauntCreatedByOwner',restarauntControl.getAllRestarauntCreatedByOwner)
router.get('/getByRestaurantId/:id',restarauntControl.getByRestarauntId)
router.put('/updateRestaurant/:id',multer.upload.fields([{name:'restarauntImage',maxCount:1},{name:'menuImage',maxCount:1}]),restarauntControl.updateRestarauntByOwner)
router.delete('/deleteRestaurant/:id',restarauntControl.deleteRestarauntByOwner)


//available food 
router.post('/avaliablefood',multer.upload.single('foodImage'),restarauntControl.avaliableItems)
router.get('/getFoodByOwner/:restaurantId',restarauntControl.getFoodItemsByOwner)
router.get('/getByFoodId/:id',restarauntControl.getByFoodId)
router.get('/getAllFood',restarauntControl.getAllFood)
router.put('/updateFood/:id',multer.upload.single('foodImage'),restarauntControl.updateFood)
router.delete('/deleteFoodItems/:id',restarauntControl.deleteFoodItems)

module.exports=router