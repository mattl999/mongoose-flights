const Flight = require("../models/flight");
const Ticket = require("../models/ticket");

function index(req, res) {
  console.log("index called");
  Flight.find({}, function (err, flights) {
    console.log(flights);
    res.render("../views/flights/index", { flights });
  });
}
function newFlight(req, res) {
  res.render("../views/flights/new");
}

function show(req, res) {
  Flight.findById(req.params.id)
  .populate('tickets')
  .exec(function(err,flight){
      console.log("flight -->",flight)
      // Ticket.find({}, function (err, tickets){
          // console.log('tickets---> ',tickets);
          
      res.render("../views/flights/show", {flight})
      // ,{tickets}
    //   ); 
    })
  }
  // )
// }
    //   Flight.findById(req.params.id).exec(function (err, flight) {
    //     console.log("flighter:", flight);
    //     Ticket.find({}, function (err, tickets) {
    //       res.render("../views/flights/show", { flight });
//     });
//   });
// }
function createFl(req, res) {
  // console.log(req.body);
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.redirect("/new");
    res.redirect("/");
  });
}

function createDes(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    flight.destinations.push(req.body);
    flight.save(function (err) {
      res.redirect(`/${flight._id}`);
    });
  });
}

function newTicket(req, res) {
  Flight.findById(req.params.id).exec(function (err, flight) {
    console.log("Ticket Function Flight", flight);
    res.render("../views/flights/newTicket", { flight });
  });
}

function createTicket(req, res) {
  console.log("createticket hit", req.body);
  console.log("id???", req.params.id);


//   const ticket = new Ticket(req.body);
  Ticket.create(req.body, function(err, ticket) {
      if (err){ return res.redirect(`/${req.params.id}/newTicket`);
    }else{
      console.log("ticccccket",ticket)
      
      ticket.flight = req.params.id
      ticket.save()
      Flight.findById(req.params.id).exec(function(err, flight){
        flight.tickets.push(ticket._id)
        flight.save()
        console.log(ticket)
      res.redirect(`/${req.params.id}`);
      })
      
    }
  });
}
module.exports = {
  index,
  new: newFlight,
  createFl,
  show,
  createDes,
  newTicket,
  createTicket,
};
