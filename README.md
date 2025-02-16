# 📈 Stock Market Learning & Investment Platform

## Problem Statement 
Lack of risk-free stock trading experience and guidance leads to poor investment decisions and limited financial literacy among beginners.

## 🚀 Project Solution

This project is a **web-based stock market learning and investment platform** that allows users to invest in stocks using **dummy money**. The platform features a **chatbot for assistance**, a **recommendation system for stock suggestions**, and a **dummy account feature** for users to practice trading without financial risk.

## 🛠️ Prototype/Deployed Site:
https://hacktoons-hackathon-git-main-raj-ramans-projects.vercel.app/

## 🌟 Features

- **🔐 User Authentication**: Secure login and registration system.
- **📊 Stock Market Simulation**: Users can trade stocks using virtual money.
- **🤖 AI-powered Chatbot**: Provides stock market education and resolves user queries.
- **📈 Recommendation System**: AI-driven stock suggestions based on market trends and user preferences.
- **📉 Portfolio Management**: Users can track their investments and profits/losses.
- **⏳ Real-time Data**: Fetches stock prices and trends from APIs.
- **🖥️ User Dashboard**: Displays portfolio, recommendations, and chatbot interactions.
- **🎮 Gamification**: Users earn rewards, badges, and ranks based on trading performance and learning milestones.

## 🛠️ Tech Stack

### 🎨 Frontend

- **React.js** – UI Development
- **Tailwind CSS** – Styling
- **Recharts** – Data visualization for stock trends

### 🏗️ Backend

- **Node.js** – Server-side logic
- **Express.js** – Backend framework
- **MongoDB** – Database for storing user data and transactions
- **Socket.io** – Real-time stock price updates

### 🤖 AI & ML

- **Python (Flask/FastAPI)** – Backend API for AI models
- **Scikit-learn** – Recommendation system
- **TensorFlow/PyTorch** – Chatbot and AI models

### 🔌 APIs & Other Services

- **Yahoo Finance API / Alpha Vantage** – Stock price data
- **Dialogflow / OpenAI API** – AI Chatbot integration
- **JWT Authentication** – Secure login and session handling

## 🏗️ Setup Instructions

1. **Clone the repository**:

   ```sh
   git clone https://github.com/your-repo-url.git
   cd stock-market-platform
   ```

2. **Install dependencies**:

   - **Frontend:**
     ```sh
     cd frontend
     npm install
     npm start
     ```
   - **Backend:**
     ```sh
     cd backend
     npm install
     node server.js
     ```
   - **AI/ML Service:**
     ```sh
     cd ai_service
     pip install -r requirements.txt
     python app.py
     ```

3. **Environment Variables**:

   Create a `.env` file for API keys and database connection:

   ```env
   MONGO_URI=your-mongodb-uri
   JWT_SECRET=your-secret-key
   STOCK_API_KEY=your-stock-api-key
   AI_CHATBOT_KEY=your-ai-chatbot-api-key
   ```

## 🔮 Future Enhancements

- **🏆 Leaderboard**: To gamify stock trading with top performers.
- **🤖 Advanced AI**: Enhancing recommendation accuracy.
- **📱 Mobile App**: Extending platform accessibility.

## 👥 Contributors

- **Sarthak Jain** – Project Lead & Developer
- **Raj Raman** – Backend Developer
- **Chirag Miglani** – Frontend Developer
- **Manik Dhiman** – Frontend Developer

---
🚀 *Happy Trading!* 🎯

