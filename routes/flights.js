var express = require('express');
var router = express.Router();
const flightCtrl = require('../controllers/flights');

router.get('/', flightCtrl.index);
router.get('/new', flightCtrl.new);
router.post('/', flightCtrl.createFl);
router.get('/:id', flightCtrl.show);
router.post('/:id', flightCtrl.createDes);
router.get('/:id/newTicket', flightCtrl.newTicket);
router.post('/:id/newTicket', flightCtrl.createTicket);

module.exports = router;