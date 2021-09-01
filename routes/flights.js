var express = require("express");
var router = express.Router();

const flightsControllers = require("../controllers/flights");

router.get("/", flightsControllers.index);
router.get("/new", flightsControllers.new);
router.post("/", flightsControllers.create);
router.get("/:id", flightsControllers.show);
router.post("/:id", flightsControllers.createDestination);

module.exports = router;
