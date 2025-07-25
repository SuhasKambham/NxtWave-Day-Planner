# NxtWave DayPlan

A modern, full-stack MERN web application for daily planning and management at NxtWave. Built for both employees and managers, with a focus on productivity, clarity, and a beautiful user experience.

---

## 🚀 Features
- **Role-based authentication:** Employee & Manager login
- **JWT security:** Secure, stateless authentication
- **Daily plan submission:** Employees submit and track daily learning/work plans
- **Reminders:** Employees are reminded of incomplete tasks from the previous day
- **Manager dashboard:** Search employees, view any user's plan by date, export to CSV
- **Modern UI:** Responsive, branded with NxtWave colors, built with React & TailwindCSS

---

## 🛠️ Tech Stack
- **Frontend:** React, TailwindCSS, Axios, React Router, Headless UI
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT, bcrypt
- **Database:** MongoDB Atlas (cloud) or local MongoDB
- **Deployment:** Vercel (frontend), Render/Railway (backend)

---

## 📁 Folder Structure
```
NxtWaveDayPlan/
├── client/   # React + Tailwind frontend
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── context/
│   │   ├── App.js
│   │   └── index.js
│   └── tailwind.config.js
├── server/   # Express + MongoDB backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── server.js
├── .env.example
├── .gitignore
└── README.md
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```sh
git clone https://github.com/SuhasKambham/NxtWave-Day-Planner.git
cd NxtWave-Day-Planner
```

### 2. Install dependencies
```sh
cd server && npm install
cd ../client && npm install
```

### 3. Configure environment variables
- Copy `.env.example` to `.env` in the `server/` folder and fill in your values:
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

### 4. Run the app locally
- **Start backend:**
  ```sh
  cd server
  npm start
  ```
- **Start frontend:**
  ```sh
  cd ../client
  npm start
  ```
- Visit [http://localhost:3000](http://localhost:3000)

---

## 🌐 Deployment
- **Backend:** Deploy to [Render](https://render.com) or [Railway](https://railway.app)
- **Frontend:** Deploy to [Vercel](https://vercel.com)
- **Database:** Use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Set environment variables in your deployment dashboard (never commit real secrets)

---

## 🤝 Contributing
1. Fork this repo
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

---

## 📄 License
This project is for educational and demonstration purposes at NxtWave.

---

**Made with MERN, Tailwind, and ❤️ by NxtWave.**