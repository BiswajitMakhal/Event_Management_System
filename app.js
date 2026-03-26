require("dotenv").config();
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors());

app.set("view engine", "ejs");
app.set("views", "views");

app.use(cookieParser());
app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const DbConnection = require("./app/config/db");
DbConnection(); 

const authRouter = require("./app/routes/authRoute");
const attendeeRoute = require("./app/routes/attendeeRoute"); 
const organizerRoute = require("./app/routes/organizerRoute"); 


app.use( authRouter);
app.use("/attendee", attendeeRoute);   
app.use("/organizer", organizerRoute); 

const port = 7000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});