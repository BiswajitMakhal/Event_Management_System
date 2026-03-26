const express = require("express");
const router = express.Router();
const AttendeeController = require("../controllers/attendeeController");
const { CheckAuth, isAttendee } = require("../middleware/checkAuth");

router.get("/dashboard", CheckAuth,isAttendee, AttendeeController.dashboard);

router.post("/book", CheckAuth,isAttendee, AttendeeController.bookEvent);

module.exports = router;