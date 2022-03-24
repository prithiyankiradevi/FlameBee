const router = require('express').Router()
const rattingControll = require('../controller/rating_controller')

router.post('/rating', rattingControll.starRating)
router.post('/like',rattingControll.userLike)

module.exports = router