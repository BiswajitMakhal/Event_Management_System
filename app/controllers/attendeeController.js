const User = require("../models/user");
const Event = require("../models/event");
const Booking = require("../models/book");

class AttendeeController {
  async dashboard(req, res) {
    try {
      const organizers = await User.find({ role: "Organizer" });
      const events = await Event.find().populate("organizer");
      const bookings = await Booking.find({ attendee: req.user.id });

      return res.render("attendee", {
        user: req.user,
        organizers: organizers,
        events: events,
        bookings: bookings,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async bookEvent(req, res) {
    try {
      const { eventId } = req.body;

      const eventDetails = await Event.findById(eventId).populate("organizer");

      if (!eventDetails) {
        return res.send("Event not found.");
      }

      const newBooking = new Booking({
        attendee: req.user.id,
        organizerName: eventDetails.organizer.name,
        eventName: eventDetails.name,
        weekday: eventDetails.weekdays.join(", "),
        time: eventDetails.time,
      });

      await newBooking.save();

      res.redirect("/attendee/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new AttendeeController();
