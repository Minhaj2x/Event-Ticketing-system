# 🎟️ Event Ticketing System API

This is a Node.js + Express RESTful API for managing an event ticketing system. It supports user registration, login with JWT authentication, and allows users to browse, create, and book events.

## 🚀 Live URL
👉 https://event-ticketing-system-io0r.onrender.com

## 📦 Tech Stack
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- JWT for authentication
- bcryptjs for password hashing
- Render for deployment

## 📁 Project Structure

```
/config         - MongoDB connection config
/controllers    - Route logic (auth, events, bookings)
/models         - Mongoose models (User, Event, Booking)
/routes         - Route definitions
/middleware     - Auth middleware
server.js       - App entry point
```

## 🔐 API Endpoints

### ✅ Auth
| Method | Route              | Description          |
|--------|--------------------|----------------------|
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Log in and get JWT  |

### 🎫 Events
| Method | Route           | Description           |
|--------|-----------------|-----------------------|
| GET    | `/api/events`   | List all events       |
| POST   | `/api/events`   | Create event (admin)  |

### 📦 Bookings
| Method | Route             | Description               |
|--------|-------------------|---------------------------|
| POST   | `/api/bookings`   | Book tickets (auth)       |
| GET    | `/api/bookings`   | Get user’s bookings (auth)|

## 🔒 JWT Auth Required for:
- POST `/api/bookings`
- GET `/api/bookings`
- POST `/api/events` (admin only)

## 🛠️ Setup Locally

```bash
git clone https://github.com/Minhaj2x/Event-Ticketing-system.git
cd Event-Ticketing-system
npm install

# Create a .env file with:
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret

npm run dev
```

## 📄 Notes
- Deployed on Render
- Uses dynamic port (`process.env.PORT`)
- Fully tested with Thunder Client & curl
