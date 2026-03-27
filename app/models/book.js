const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema(
  {
    attendee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    organizerName: String,
    eventName: String,
    weekday: String,
    time: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("booking", bookingSchema);