var express = require("express");
var router = express.Router();

const ticketsControllers = require("../controllers/tickets");

router.get("/:id/tickets/new", ticketsControllers.showTicket);
router.post("/:id/tickets/new", ticketsControllers.createTicket);

module.exports = router;
