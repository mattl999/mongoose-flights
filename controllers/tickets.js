const Flight = require('../models/flight');

function addTicket (req, res, next) {
    Flight.findById(req.params.id, function (err, flight) {
        flight.ticket.push
    })
}


module.exports = 
{

}