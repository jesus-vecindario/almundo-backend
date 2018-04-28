var express = require('express');
var router = express.Router();

const hotelCtrl = require('../controllers/hotel');

router.get('/', hotelCtrl.getHotels);
router.get('/:hotelId', hotelCtrl.getHotel);
router.post('/', hotelCtrl.createHotel);
router.put('/:hotelId', hotelCtrl.updateHotel);
router.delete('/:hotelId', hotelCtrl.deleteHotel);

module.exports = router;
