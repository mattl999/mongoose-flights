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
  Flight.findById(req.params.id).exec(function (err, flight) {
    console.log("flighter:", flight);
    Ticket.find({}, function (err, tickets) {
      res.render("../views/flights/show", { flight });
    //   Flight.findById(req.params.id).exec(function (err, flight) {
    //     console.log("flighter:", flight);
    //     Ticket.find({}, function (err, tickets) {
    //       res.render("../views/flights/show", { flight });
    });
  });
}
function create(req, res) {
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
  console.log("Airport: ", req.body);
  Flight.findById(req.params.id, function (err, flight) {
    console.log(flight);
    console.log("hit");
    flight.destinations.push(req.body);
    console.log("flightObj; ", flight);
    flight.save(function (err) {
      console.log("saved");
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
  for (let key in req.body) {
    if (req.body[key] === "") delete req.body[key];
  }
//   const ticket = new Ticket(req.body);
  Ticket.create(req.body, function(err) {
      if (err) return res.redirect(`/${req.params.id}/newTicket`);
      res.redirect(`/${req.params.id}`);
  });
}
module.exports = {
  index,
  new: newFlight,
  create,
  show,
  createDes,
  newTicket,
  createTicket,
};
