<div align="center">

# 🎓 EduStream_360

**A Role-Based Learning Management System with Field-Specific Content Delivery**

Built with the MERN stack — MongoDB, Express.js, React.js, Node.js

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

</div>

---

## 📖 Overview

**EduStream_360** is a full-stack Learning Management System designed for institutions that organize learning by **field of study / group**, rather than a flat, one-size-fits-all catalog. Students only ever see the lectures, quizzes, and assignments relevant to their declared field — nothing more, nothing less.

The platform runs on three tightly-scoped roles:

| Role | Responsibility |
|---|---|
| 🧑‍🎓 **Student** | Registers, completes a field-of-study profile, consumes lectures, attempts quizzes/assignments, tracks progress |
| 👨‍🏫 **Instructor** | Registers (pending admin approval), uploads lectures, creates quizzes/assignments for their field |
| 🛡️ **Admin** | Approves/rejects instructors, reviews and publishes lectures, oversees platform-wide content |

Every piece of content is scoped by **study group/field**, enforced end-to-end — from database schema to API middleware to UI rendering — so a student in "Computer Science" never sees content meant for "Electrical Engineering," and vice versa.

---

## ✨ Core Features

### Authentication & Onboarding
- Secure registration with **JWT-based authentication** and **bcrypt**-hashed passwords
- Student registration validated against email format and CNIC pattern
- Mandatory profile completion step for students (study group/field selection) before dashboard access
- Instructor accounts remain in a `pending` state until admin approval — no login access until approved

### Content Management & Moderation
- Instructors upload lectures tagged with a `field/category`
- Every lecture enters a `pending` review queue — admins approve or reject before it becomes visible
- Approved lectures are automatically routed to students in the matching field only

### Assessments & Progress Tracking
- Instructors create **quizzes** and **assignments** scoped to their field of study
- Students attempt assessments tied only to their own field
- Progress is calculated from quiz scores and assignment submissions, surfaced on the student dashboard

### Access Control
- Role-based route protection (`Admin`, `Instructor`, `Student`) via middleware
- Field-based data filtering enforced at the API/query level, not just the UI — preventing students from accessing out-of-scope content even via direct API calls

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, React Router, Axios, Tailwind CSS |
| Backend | Node.js, Express.js |
| Database | MongoDB with Mongoose ODM |
| Auth | JSON Web Tokens (JWT), bcrypt |
| File/Video Storage | Multer (local) / Cloudinary or AWS S3 (production) |
| Validation | express-validator / Joi |

---

## 🗂️ Project Structure

```
EduStream_360/
├── backend/
│   ├── config/            # DB connection, env config
│   ├── controllers/       # Route logic (auth, lectures, evaluations, users)
│   ├── middlewares/       # authMiddleware, roleMiddleware, errorHandler
│   ├── models/            # User, Lecture, Evaluation, Submission schemas
│   ├── routes/            # /api/auth, /api/students, /api/instructors, /api/admin
│   ├── utils/             # helpers, validators
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/    # Shared UI components
    │   ├── pages/         # Role-specific dashboards & views
    │   ├── context/        # Auth context / global state
    │   ├── services/       # Axios API calls
    │   └── App.jsx
    └── package.json
```

---

## 🧬 Database Schema (Overview)

**User**
```js
{
  name: String,
  email: String,           // unique
  password: String,        // hashed
  role: "student" | "instructor" | "admin",
  cnic: String,             // students only
  studyGroup: String,       // students only, e.g. "Computer Science"
  isApproved: Boolean,      // instructors only, default: false
  isProfileComplete: Boolean, // students only
  createdAt: Date
}
```

**Lecture**
```js
{
  title: String,
  description: String,
  videoUrl: String,
  studyGroup: String,       // field/category this lecture belongs to
  uploadedBy: ObjectId,     // ref: User (instructor)
  status: "pending" | "approved" | "rejected",
  reviewedBy: ObjectId,     // ref: User (admin)
  createdAt: Date
}
```

**Evaluation** (Quiz / Assignment)
```js
{
  title: String,
  type: "quiz" | "assignment",
  studyGroup: String,
  createdBy: ObjectId,      // ref: User (instructor)
  questions: [ /* for quizzes */ ],
  deadline: Date,           // for assignments
  totalMarks: Number
}
```

**Submission**
```js
{
  evaluation: ObjectId,     // ref: Evaluation
  student: ObjectId,        // ref: User
  answers: [ /* quiz answers */ ] | fileUrl, // assignment file
  score: Number,
  submittedAt: Date
}
```

---

## 🔌 API Overview

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register as student or instructor |
| POST | `/api/auth/login` | Public | Login and receive JWT |
| PUT | `/api/students/profile` | Student | Complete profile (study group, etc.) |
| GET | `/api/students/lectures` | Student | Get approved lectures for own field |
| GET | `/api/students/evaluations` | Student | Get quizzes/assignments for own field |
| POST | `/api/students/submit/:evalId` | Student | Submit quiz/assignment answers |
| POST | `/api/instructors/lectures` | Instructor (approved) | Upload a new lecture |
| POST | `/api/instructors/evaluations` | Instructor (approved) | Create quiz/assignment |
| GET | `/api/admin/instructors/pending` | Admin | List instructors awaiting approval |
| PATCH | `/api/admin/instructors/:id/approve` | Admin | Approve/reject an instructor |
| GET | `/api/admin/lectures/pending` | Admin | List lectures awaiting review |
| PATCH | `/api/admin/lectures/:id/review` | Admin | Approve/reject a lecture |

*(Full endpoint documentation to be added as the API stabilizes — consider a `/docs` folder with Postman collection or Swagger.)*

---

## ⚙️ Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local instance or Atlas cluster)
- npm or yarn

### 1. Clone the repository
```bash
git clone https://github.com/your-username/EduStream_360.git
cd EduStream_360
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

Run the server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Run the app:
```bash
npm run dev
```

---

## 🗺️ Roadmap

- [ ] Email verification on registration
- [ ] Video upload with cloud storage (Cloudinary/S3) and progress bar
- [ ] Auto-graded quizzes with instant feedback
- [ ] Assignment file upload & instructor grading interface
- [ ] Student progress analytics dashboard (charts, completion %)
- [ ] Notifications (email/in-app) for approvals and new content
- [ ] Admin analytics dashboard (platform-wide stats)

---

## 🤝 Contributing

Contributions are welcome. Please fork the repo, create a feature branch, and open a pull request:

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```

---

## 📄 License

This project is licensed under the [MIT License](./LICENSE).

---

<div align="center">

Built with ❤️ using the MERN Stack

</div>
