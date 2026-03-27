const express = require("express");
const router = express.Router();
const OrganizerController = require("../controllers/OrganizerController");
const {CheckAuth,isOrganizer} = require("../middleware/checkAuth");

router.get("/dashboard", CheckAuth,isOrganizer, OrganizerController.dashboard);

router.post("/event/add", CheckAuth,isOrganizer, OrganizerController.addEvent);

module.exports = router;


