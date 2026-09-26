# 💰 Smart Expense Manager

A full-stack MERN application for tracking personal expenses, managing monthly budgets, and analyzing spending patterns through interactive dashboards and reports.

## 🚀 Features

### 🔐 Authentication

* User registration and login
* Secure authentication using JWT
* User-specific expense data
* Logout functionality

### 💳 Expense Management

* Add daily expenses
* View expense history
* Search expenses
* Filter by category
* Filter by date
* Delete expenses
* Track total spending

### 📊 Dashboard & Analytics

* Total spending overview
* Current month spending
* Weekly spending chart
* Monthly spending comparison
* 6-month spending trend
* Category-wise spending analysis
* Smart spending insights
* Interactive charts

### 💰 Budget Management

* Set monthly budget
* Track budget usage
* View remaining budget
* Budget progress indicator
* 80% budget warning
* Budget exceeded warning
* Daily spending limit

### 📄 Monthly Reports

* Select a specific month
* Total monthly spending
* Number of transactions
* Average expense
* Top spending category
* Category-wise breakdown
* Monthly transaction list
* Print/export report

### 🎨 User Interface

* Modern responsive dashboard
* Professional landing page
* Login/Register page
* Responsive design for different screen sizes
* Clean and user-friendly interface

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* Recharts
* Lucide React

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* MongoDB Atlas
* Mongoose

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Antigravity AI

## 📁 Project Structure

```text
Smart Expense Manager/
│
├── client/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Welcome.jsx
│   │   ├── Auth.jsx
│   │   ├── AddExpense.jsx
│   │   ├── ExpenseHistory.jsx
│   │   ├── BudgetCard.jsx
│   │   ├── BudgetChart.jsx
│   │   ├── WeeklySpending.jsx
│   │   ├── SpendingInsights.jsx
│   │   ├── SpendingTrend.jsx
│   │   ├── MonthlyExpenseReport.jsx
│   │   └── services/
│   │
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
├── package.json
└── README.md
```

## ⚙️ Installation & Setup

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd "Smart Expense Manager"
```

### 2. Install dependencies

Install root dependencies:

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

### 3. Configure environment variables

Create a `.env` file inside the `server` folder.

Example:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

**Do not upload your `.env` file or database password to GitHub.**

### 4. Start the application

From the project root:

```bash
npm run dev
```

The application will run at:

```text
Frontend: http://localhost:3000
Backend:  http://localhost:5000
```

## 📊 Application Flow

```text
Welcome Page
      ↓
Login / Register
      ↓
Dashboard
      ↓
Add Expense
      ↓
Expense History
      ↓
Analytics & Reports
      ↓
Budget Management
```

## 🔮 Future Enhancements

* Google Authentication
* Email notifications
* Advanced AI-based spending recommendations
* Recurring expenses
* Multiple budget categories
* PDF report download
* Expense visualization improvements
* Cloud deployment
* Mobile application

## 🔒 Security

Sensitive configuration such as MongoDB credentials and JWT secrets should be stored in environment variables and should never be committed to the repository.

## 📌 Project Status

🚧 **Actively developed**

The project is being developed as a full-stack MERN application with expense tracking, budgeting, analytics, and reporting features.

## 👨‍💻 Author

**Poorvik Acharya**

Computer Science Engineering Student


⭐ If you find this project useful, consider giving the repository a star!
