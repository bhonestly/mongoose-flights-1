var express = require('express');
var router = express.Router();

const flightCtrl = require('../controllers/flights')

/* GET home page. */
router.get('/', flightCtrl.index);
router.get('/sort', flightCtrl.indexSort)
router.get('/new', flightCtrl.new);
router.post('/', flightCtrl.create);

module.exports = router;
