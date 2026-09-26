# 💰 Smart Expense Manager

A full-stack expense management application built using the **MERN stack** that helps users track, manage, and analyze their daily expenses through an easy-to-use dashboard.

## 📌 About the Project

Smart Expense Manager allows users to record their expenses, view expense history, and understand their spending patterns through visualizations.

The application provides a simple dashboard where users can manage their financial records and monitor their spending.

## ✨ Features

* 🔐 User Registration and Login
* 🔑 User Authentication
* 💰 Add and manage expenses
* 📋 View expense history
* 📊 Weekly spending visualization
* 📈 Expense analysis through dashboard
* 🗂️ Categorized expense management
* 🧭 Simple and responsive dashboard
* 🚪 Secure logout
* ☁️ MongoDB database integration

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite

### Backend

* Node.js
* Express.js

### Database

* MongoDB
* MongoDB Atlas

### Development Tools

* Antigravity
* Git
* GitHub

## 📂 Project Structure

```text
Smart-Expense-Manager/
│
├── client/
│   ├── public/
│   └── src/
│       ├── components/
│       ├── services/
│       ├── AddExpense.jsx
│       ├── Auth.jsx
│       ├── ExpenseHistory.jsx
│       ├── ExpenseList.jsx
│       ├── App.jsx
│       └── main.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── .gitignore
├── package.json
└── README.md
```

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/poorvik-acharya16/Smart-Expense-Manager.git
```

### 2. Navigate to the Project

```bash
cd Smart-Expense-Manager
```

### 3. Install Dependencies

Install the main project dependencies:

```bash
npm install
```

Install frontend dependencies:

```bash
cd client
npm install
```

Install backend dependencies:

```bash
cd ../server
npm install
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server` folder.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5000
```

⚠️ **Important:** Never upload your `.env` file to GitHub because it may contain private database credentials or other secrets.

### 5. Start the Backend

From the `server` folder:

```bash
npm start
```

Or, depending on your package configuration:

```bash
npm run dev
```

### 6. Start the Frontend

Open another terminal:

```bash
cd client
npm run dev
```

The frontend will be available at the local URL provided by Vite.

## 📊 Main Modules

### 🔐 Authentication

Users can register and log in to access their personal expense dashboard.

### 💰 Expense Management

Users can add and manage expenses with details such as amount, category, and description.

### 📋 Expense History

Users can view previously recorded expenses in an organized format.

### 📊 Dashboard

The dashboard provides an overview of spending and visual representations of expense data.

### 📈 Weekly Spending Visualization

Users can analyze their spending across different days of the week using visual charts.

## 🔒 Security

Sensitive configuration files such as `.env` are excluded from Git using `.gitignore`.

Database credentials, passwords, API keys, and other secrets should never be committed to the public repository.

## 🔮 Future Improvements

* Monthly and yearly expense reports
* Budget planning and alerts
* Export expenses to PDF/Excel
* Advanced spending analytics
* More visualization options
* Mobile-friendly improvements
* Deployment with a live demo
* Email notifications
* Improved financial insights

## 🎯 Project Goal

The goal of Smart Expense Manager is to provide users with a simple and convenient platform for recording expenses and understanding their spending habits.

## 👨‍💻 Author

**Poorvik Acharya**

GitHub:
https://github.com/poorvik-acharya16

---

⭐ If you find this project useful, consider giving the repository a star!
