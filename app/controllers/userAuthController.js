const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthEjsController {
  async registerView(req, res) {
    try {
      res.render("register");
    } catch (err) {
      console.log(err);
    }
  }
 async registerCreate(req, res) {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.redirect("/register/view");
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.redirect("/login/view");
    }

    const salt = await bcryptjs.genSalt(10);
    const hashPassword = await bcryptjs.hash(password, salt);

    const userData = new User({
      name,
      email,
      role: "Attendee",
      password: hashPassword,
    });

    const user = await userData.save();

    if (user) {
      return res.redirect("/login/view");
    } else {
      return res.redirect("/register/view");
    }

  } catch (error) {
    console.log(error);
    return res.redirect("/register/view");
  }
}

  async LoginView(req, res) {
    res.render("login");
  }

  async LoginCreate(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email: email });

      if (!user) {
        return res.redirect("/login/view");
      }

      const isMatch = await bcryptjs.compare(password, user.password);
      if (!isMatch) {
        return res.redirect("/login/view");
      }

      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "1h" },
      );

      res.cookie("userToken", token);

      if (user.role === "Organizer") {
        return res.redirect("/organizer/dashboard");
      } else if (user.role === "Attendee") {
        return res.redirect("/attendee/dashboard");
      }
    } catch (error) {
      console.log(error);
      return res.redirect("/login/view");
    }
  }

  async dashboard(req, res) {
    res.render("organizer", {
      user: req.user,
    });
  }

  async logout(req, res) {
    res.clearCookie("userToken");
    res.redirect("/login/view");
  }
}

module.exports = new AuthEjsController();
