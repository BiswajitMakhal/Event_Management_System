const Event = require("../models/event");

class OrganizerController {
  async dashboard(req, res) {
    try {
      const allEvents = await Event.find().populate("organizer", "name");

      const myEvents = allEvents.filter(
        (event) => event.organizer._id.toString() === req.user.id,
      );
      const otherEvents = allEvents.filter(
        (event) => event.organizer._id.toString() !== req.user.id,
      );

      res.render("organizer", {
        user: req.user,
        myEvents: myEvents,
        otherEvents: otherEvents,
      });
    } catch (err) {
      console.log(err);
    }
  }

  async addEvent(req, res) {
    try {
      const { name, weekdays, time } = req.body;

      const existingEvent = await Event.findOne({
        organizer: req.user.id,
        time: time,
        weekdays: { $in: weekdays },
      });

      if (existingEvent) {
        return res.send(
          "Conflict error! You already have an event scheduled on one of these days at this time.",
        );
      }

      const newEvent = new Event({
        name,
        weekdays,
        time,
        organizer: req.user.id,
      });

      await newEvent.save();
      res.redirect("/organizer/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = new OrganizerController();
