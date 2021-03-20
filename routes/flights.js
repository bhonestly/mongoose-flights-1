var express = require('express');
var router = express.Router();

const flightCtrl = require('../controllers/flights')

/* GET home page. */
router.get('/', flightCtrl.index);
router.get('/sort', flightCtrl.indexSort)
router.get('/new', flightCtrl.new);
router.get('/:id', flightCtrl.show )
router.post('/', flightCtrl.create);
router.post('/:id', flightCtrl.createTicket)
router.delete('/:id/:tid', flightCtrl.deleteTicket)
router.delete('/:id', flightCtrl.deleteFlight)

module.exports = router;
