## ENV VARIABLE NAME:

** MONGODB:
MONGO_URL

** JWT:
JWT_SECRET_KEY 

\`\`\`

# Event Management System

A simple, role-based Event Management System built with Node.js, Express, MongoDB, and EJS. This system allows Organizers to schedule events and Attendees to book them without any time conflicts.

## 🚀 Features

### Authentication & Authorization
* User registration and login.
* Two specific roles: **Organizer** and **Attendee**.
* JWT-based authentication stored in HTTP-only cookies.
* Role-based route protection (Attendees cannot access Organizer routes and vice versa).

### 👔 Organizer Dashboard
* Create new events by specifying the Event Name, multiple Weekdays (e.g., Monday, Wednesday, Friday), and Time (e.g., 9am).
* **Conflict Prevention:** Backend validation prevents an Organizer from creating multiple events on the same day at the same time.
* View a list of their own scheduled events.
* View events created by other organizers (Read-only access).

### 🎟️ Attendee Dashboard
* View all available events grouped by Organizers.
* Book an event easily via a simple dropdown selection (auto-fetches Organizer name, days, and time).
* View a personalized list of all successfully booked events presented in clean UI cards.

## 🛠️ Tech Stack
* **Backend:** Node.js, Express.js
* **Database:** MongoDB, Mongoose
* **Frontend:** EJS (Embedded JavaScript templates), Bootstrap 4, HTML/CSS
* **Security:** bcryptjs (Password hashing), jsonwebtoken (JWT for authentication)

## ⚙️ Installation & Setup

**1. Clone the repository:**
\`\`\`bash
git clone <your-github-repo-url>
cd Event_Management_System
\`\`\`

**2. Install dependencies:**
\`\`\`bash
npm install
\`\`\`


**3. Run the application:**
\`\`\`bash
npm start
\`\`\`
The server will start at `http://localhost:7000`.

## 📂 Folder Structure
\`\`\`

├── app/
│   ├── config/          # Database connection (db.js)
│   ├── controllers/     # Route logic (Auth, Organizer, Attendee)
│   ├── middleware/      # JWT & Role checking (checkAuth.js)
│   ├── models/          # Mongoose schemas (User, Event, Booking)
│   └── routes/          # Express route definitions
├── views/               # EJS template files (login, register, attendee, organizer)
├── .env                 # Environment variables
├── app.js               # Application entry point
└── package.json         # Project metadata and dependencies
\`\`\`

---
