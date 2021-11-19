
const Flight = require('../models/flight');


function index (req, res) {
    console.log("index called")
    Flight.find({}, function(err, flights) {
        console.log(flights);
    res.render('../views/flights/index', {flights});
})
}
function newFlight(req,res) {
    res.render('../views/flights/new');
    
}

function show(req, res){
    Flight.findById(req.params.id).exec(function(err, flight) {
    // console.log(flight);
    res.render('../views/flights/show', {flight} );
    })
}
function create(req, res) {
// console.log(req.body);
for (let key in req.body) {
    if (req.body[key] === '') delete req.body[key];
  }
const flight = new Flight(req.body);
flight.save(function(err){
    if (err) return res.redirect('/new');
    res.redirect('/');
});
}

function createDes(req, res){
    console.log("Airport: ",req.body);
    Flight.findById(req.params.id, function(err, flight ){
        console.log(flight);
            console.log("hit")
        flight.destinations.push(req.body);
    
        flight.save(function(err){
            res.redirect(`/${flight._id}`)
        })
    })
// console.log(req.params.id);
// console.log(req.params);

//     res.redirect(`/${flight.id}`)
}

module.exports = {
    index,
    new: newFlight,
    create,
    show,
    createDes,
}