const Flight = require("../models/flight");

const Ticket = require("../models/ticket");

module.exports = {
  showTicket,
  createTicket,
};

function showTicket(req, res) {
  Flight.findById(req.params.id, function (err, flight) {
    Ticket.find({}, function (err, tickets) {
      res.render("tickets/new", { flight, tickets });
    });
  });
}

function createTicket(req, res) {
  let flightID = req.params.id;

  const newTicket = new Ticket(req.body);

  newTicket.flight.push(flightID);
  newTicket.save(function (err) {
    if (err) return res.redirect("/flights");
    res.redirect(`/flights/${flightID}`);
  });
}
