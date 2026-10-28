# CollegeAssist — AI-Powered College Admission Counselor

A full-stack, pixel-faithful web application built to assist high school students with personalized college recommendations, admission criteria analysis, AI counseling dialogues, and counseling history tracking.

---

## 📸 Reference Screens & Implementations

| Figure | Screen Name | Description | Hash Route |
|---|---|---|---|
| **Figure 11** | **Chat with AI Counselor** | Interactive admission dialogue with question bubbles, source tags, bot & user avatars, quick suggestion chips | `/#/chat` |
| **Figure 12** | **Student Profile Entry** | Two-column profile entry for 12th stream, location, removable interest chips, degree, and score | `/#/profile` |
| **Figure 13** | **Recommended Programmes** | College cards featuring IIT Madras, Anna University, CIT with emblems, cutoffs, and detailed modal | `/#/recommendations` |
| **Figure 14** | **Counseling History** | Chronological record of questions, responses, and verification sources (College DB, Portals) | `/#/history` |
| **Figure 15** | **Login Interface** | Split screen with campus photo, navy overlay, remember-me toggle, and clean authentication card | `/#/login` |
| **Figure 16** | **Sign Up Interface** | Account creation with full name, email, password visibility toggle, and instant redirect | `/#/signup` |
| **Dashboard** | **Home Overview** | Welcome portal with quick stats, profile summary, program match snapshot, and AI shortcuts | `/#/home` |

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite 6, TypeScript, Tailwind CSS, Lucide React
- **Backend**: Node.js 24, Express, SQLite (`node:sqlite`), bcryptjs, jsonwebtoken, CORS
- **DevOps**: Docker, Docker Compose, Nginx (production frontend container)

---

## 🚀 Quick Start Guide (One-Sequence Setup)

### Prerequisites
- Node.js (v18+ or v24+)
- npm (v9+)

### 1. Install Dependencies
Open two terminals or run from the root:

```bash
# In backend folder:
cd backend
npm install

# In frontend folder:
cd frontend
npm install
```

### 2. Seed Database
Seed the database with the pre-configured student profile (Rithan V), 32 Indian colleges and programs, and Figure 14 counseling history rows:

```bash
cd backend
npm run seed
```

### 3. Start Both Applications

**Terminal 1 (Backend API):**
```bash
cd backend
npm run dev
# Running at: http://localhost:5000
```

**Terminal 2 (Frontend Client):**
```bash
cd frontend
npm run dev
# Running at: http://localhost:5173
```

Now open **http://localhost:5173** in your web browser.

---

## 🔑 Demo Credentials
- **Email**: `rithan@example.com`
- **Password**: `password123`

---

## 🌐 API Endpoints Reference

### Authentication (`/api/auth`)
- `POST /api/auth/signup` — Register new student account
- `POST /api/auth/login` — Sign in and issue JWT (supports `remember_me`)
- `GET /api/auth/me` — Retrieve current user profile and session

### Student Profile (`/api/profile`)
- `GET /api/profile` — Fetch student academic profile and interests
- `POST /api/profile` — Update academic score, stream, location, degree, and interest tags

### Recommendations (`/api/recommendations`)
- `GET /api/recommendations` — Fetch scored and ranked college recommendations matching student profile
- `GET /api/recommendations/:id` — Fetch detailed college overview, fees, NIRF rank, placements, and eligibility

### AI Counselor Chat (`/api/chat`)
- `POST /api/chat` — Send query to counselor; receives verified guidance and automatically logs into history

### Counseling History (`/api/history`)
- `GET /api/history` — Retrieve all counseling logs ordered newest first
- `GET /api/history/:id` — View detailed query and response dialogue
- `DELETE /api/history/:id` — Remove history entry

---

## 🐳 Docker Deployment

To run both services using Docker Compose:

```bash
docker-compose up --build
```

- Frontend accessible at: `http://localhost:5173`
- Backend API accessible at: `http://localhost:5000`

---

## ☁️ Production Cloud Deployment Guide

### Frontend on Vercel or Netlify
1. Connect the repository to Vercel/Netlify.
2. Set **Root Directory** to `frontend`.
3. Set **Build Command** to `npm run build`.
4. Set **Output Directory** to `dist`.
5. Set Environment Variable:
   - `VITE_API_URL` = `https://your-backend-service.onrender.com`

### Backend on Render or Railway
1. Create a new Web Service and set Root Directory to `backend`.
2. Set **Build Command** to: `npm install && npm run seed`
3. Set **Start Command** to: `npm start`
4. Set Environment Variables:
   - `PORT` = `5000`
   - `JWT_SECRET` = `your-secure-random-secret`
   - `NODE_ENV` = `production`
