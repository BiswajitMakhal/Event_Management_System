const jwt = require("jsonwebtoken");
const CheckAuth = (req, res, next) => {
  if (req.cookies && req.cookies.userToken) {
    jwt.verify(
      req.cookies.userToken,
      process.env.JWT_SECRET_KEY,
      (err, data) => {
        req.user = data;
        console.log(req.user);

        next();
      },
    );
  } else {
    next();
  }
};

const isOrganizer = (req, res, next) => {
  if (req.user && req.user.role === "Organizer") {
    next();
  } else {
    return res.redirect("/login/view");
  }
};

const isAttendee = (req, res, next) => {
  if (req.user && req.user.role === "Attendee") {
    next();
  } else {
    return res.redirect("/login/view");
  }
};

module.exports = { CheckAuth, isOrganizer, isAttendee };
