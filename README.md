# Smart Expense Manager (MERN)

A modern full-stack MERN (MongoDB, Express, React, Node.js) application for personal expense tracking and financial analytics.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express 4, Mongoose 8, CORS, Dotenv
- **Database**: MongoDB (configured via Mongoose)

---

## Project Structure

```
smart-expense-manager/
├── package.json              # Root script runner (concurrently)
├── .gitignore                # Global git ignore
├── README.md                 # Project documentation
├── client/                   # React + Vite Frontend
│   ├── index.html            # Main HTML with Google Fonts
│   ├── vite.config.js        # Vite config with Tailwind & API proxy
│   ├── package.json          # Frontend dependencies & scripts
│   └── src/
│       ├── main.jsx          # React app entry
│       ├── App.jsx           # Responsive dashboard layout
│       ├── index.css         # Tailwind CSS imports & theme
│       ├── components/
│       │   ├── Navbar.jsx    # Top navigation & live server pill
│       │   ├── StatusCard.jsx # Health check & response viewer
│       │   └── ArchitectureOverview.jsx # Stack & structure overview
│       └── services/
│           └── api.js        # Health check API service
└── server/                   # Node.js + Express Backend
    ├── server.js             # Express app entry & middleware
    ├── .env                  # Environment variables (PORT, MONGO_URI)
    ├── .env.example          # Environment template
    ├── package.json          # Backend dependencies & scripts
    ├── config/
    │   └── db.js             # Mongoose DB connection logic
    ├── controllers/
    │   └── health.controller.js # GET /api/health controller
    ├── routes/
    │   ├── index.js          # Central API router (/api)
    │   └── health.routes.js  # /api/health route
    ├── models/
    │   └── .gitkeep          # Mongoose schemas placeholder
    └── middleware/
        ├── errorHandler.js   # Centralized error handler
        └── notFoundHandler.js# 404 handler
```

---

## Getting Started

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/) (Local Community Server or MongoDB Atlas URI)

### 2. Environment Setup
The backend environment is configured in `server/.env`:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/smart-expense-manager
NODE_ENV=development
```

### 3. Installation
To install dependencies across root, client, and server in one go:
```bash
npm run install:all
```
Or individually:
```bash
# In client/
cd client && npm install

# In server/
cd ../server && npm install
```

### 4. Running the Application

#### Option A: Run Both Concurrently (Recommended)
From the root workspace directory:
```bash
npm run dev
```
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

#### Option B: Run Individually
In separate terminal windows:
```bash
# Terminal 1 - Backend
npm run server
# or: cd server && npm run dev

# Terminal 2 - Frontend
npm run client
# or: cd client && npm run dev
```

---

## API Endpoints

| Method | Endpoint | Description | Sample Response |
|--------|----------|-------------|-----------------|
| `GET` | `/api/health` | Health verification | `{"success": true, "message": "Smart Expense Manager API is running"}` |
| `GET` | `/` | API status index | `{"project": "Smart Expense Manager API", "status": "online", ...}` |
