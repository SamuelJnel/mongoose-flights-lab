const Flight = require("../models/flight");

const Ticket = require("../models/ticket");

module.exports = {
  index,
  new: newFlight,
  create,
  show,
  createDestination,
};

function index(req, res) {
  Flight.find(function (err, flights) {
    res.render("flights/index", { flights });
  });
}

function newFlight(req, res) {
  const newDate = new Flight();

  const dt = newDate.departs;

  const departsDate = dt.toISOString().slice(0, 16);

  res.render("flights/new", { departsDate });
}

function create(req, res) {
  const flight = new Flight(req.body);
  flight.save(function (err) {
    if (err) return res.redirect("/flights/new");
    res.redirect("/flights");
  });
}

async function createDestination(req, res) {
  let addDestination = await Flight.findById(req.params.id);

  addDestination.destinations.push({
    airport: req.body.airport,
    arrival: req.body.arrival,
  });
  await addDestination.save();
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.find({ flight: flight._id }, function (err, ticket) {
      res.render("flights/show", { ticket, flight: addDestination });
    });
  });
}

function show(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.find({ flight: flight._id }, function (err, ticket) {
      res.render("flights/show", { flight, ticket });
    });
  });
}
