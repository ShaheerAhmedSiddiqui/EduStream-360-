<div align="center">

# 📚 EduStream 360

**A Role-Based Learning Management System with Field-Specific, YouTube-Powered Content Delivery**

Built with Node.js, Express, Sequelize, and MySQL

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-4.x-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-8.x-4479A1?logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Sequelize](https://img.shields.io/badge/Sequelize-6.x-52B0E7?logo=sequelize&logoColor=white)](https://sequelize.org/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)

</div>

---

## 📖 Overview

**EduStream** is a full-stack, role-based Learning Management System that delivers targeted educational content by matching recorded video lectures to a student's specific **field of study** and **class**. Rather than hosting video files directly, instructors publish lectures by linking **public/unlisted YouTube videos** — eliminating server bandwidth and storage costs entirely, while every submission still passes through an **admin-moderated approval pipeline** before it reaches students.

The system is built on a relational data model (MySQL + Sequelize) with strict foreign-key integrity, ensuring that user profiles, lectures, and moderation records stay consistent and free of orphaned data.

---

## 🎨 System Architecture & Workflow

1. **Onboarding** — Users sign up securely. Students and instructors then complete a profile layer enforcing relational identity mappings and format validation (e.g. CNIC).
2. **Content Generation** — Approved instructors publish lectures by supplying a title, description, target audience (`studyGroup` / `classOfStudy`), and a YouTube video URL.
3. **Moderation Pipeline** — Every lecture submission lands in a `pending` state. Admins review it and mark it `approved` or `rejected`.
4. **Dynamic Feed Delivery** — Authenticated students receive a personalized feed containing *only* approved lectures matching their `studyGroup` and `classOfStudy`, streamed natively via an embedded iframe player.

---

## ⚙️ Key Features

- **Role-Based Access Control (RBAC)** — Strict route isolation between Admin, Instructor, and Student portals, enforced via cryptographically signed JSON Web Tokens (JWT).
- **Relational Database Integrity** — MySQL + Sequelize ORM with strong foreign-key constraints and cascading deletions to prevent orphaned profile or content records.
- **Costless Video Infrastructure** — No cloud storage (S3/Cloudinary) or heavy server load; media streams directly from YouTube.
- **Admin-Moderated Publishing** — Every lecture is reviewed and explicitly approved or rejected before reaching students, with a full audit trail of who reviewed what.
- **Strict Data Validation** — Backend-enforced regex validation for structured fields, including Pakistani CNIC format (`xxxxx-xxxxxxx-x`).
- **Targeted Content Feed** — Students only ever see content scoped to their own study group and class — enforced at the query level, not just the UI.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| ORM | Sequelize (v6) |
| Database | MySQL (v8) |
| Authentication | JSON Web Tokens (JWT), bcryptjs |
| Frontend | React.js, Tailwind CSS |
| Video Delivery | YouTube (embedded iframe player) |

---

## 📂 Project Directory Structure

```text
edustream/
├── backend/
│   ├── config/
│   │   └── db.js           # MySQL connection & Sequelize instance setup
│   ├── controllers/        # Business logic (Auth, Profiles, Lectures, Moderation)
│   ├── middleware/         # JWT verification & role-based authorizers
│   ├── models/             # Sequelize schemas & foreign-key relationships
│   ├── routes/             # Endpoint mapping layers
│   └── index.js            # Server entry point & DB synchronization
└── frontend/                # React SPA (Tailwind CSS, role-based dashboards)
```

---

## 🧬 Entity Relationship Overview

```
┌───────────────┐          ┌──────────────────┐
│     Users     │───(1:1)─►│     Students     │
│  (id - UUID)  │          │ studyGroup, class│
└───────┬───────┘          └──────────────────┘
        │
      (1:1)
        │                  ┌──────────────────┐
        │                  │     Lectures     │
        │                  │ youtubeUrl, status│
        │                  └────────┬─────────┘
        ▼                           │
┌───────────────┐                   │
│  Instructors  │───────(1:M)───────┘
│  (uploadedBy) │
└───────────────┘

┌───────────────┐          ┌──────────────────┐
│  Admins       │───(1:M)─►│     Lectures     │
│ (reviewedBy)  │          │  (approval trail)│
└───────────────┘          └──────────────────┘
```

- `User ↔ Student` — linked via `userId`, `ON DELETE CASCADE`
- `User ↔ Instructor` — linked via `userId`, `ON DELETE CASCADE`
- `Instructor → Lectures` — linked via `uploadedBy`
- `Admin (User) → Lectures` — linked via `reviewedBy`, tracking moderation authorship

---

## 🔒 Relational Model Integrity Constraints

| Relationship | Foreign Key | Behavior |
|---|---|---|
| `User → Student` | `userId` | `ON DELETE CASCADE` — deleting a User removes their Student profile |
| `User → Instructor` | `userId` | `ON DELETE CASCADE` — deleting a User removes their Instructor profile |
| `Instructor → Lecture` | `uploadedBy` | Binds each lecture explicitly to its publishing instructor |
| `Admin (User) → Lecture` | `reviewedBy` | Tracks which admin approved/rejected a given lecture |

---

## 🔌 Core API Surface

| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/api/auth/register` | Public | Register as Student or Instructor |
| POST | `/api/auth/login` | Public | Authenticate and receive JWT |
| PUT | `/api/students/profile` | Student | Complete profile (CNIC, studyGroup, class) |
| GET | `/api/students/lectures` | Student | Fetch approved lectures matching own studyGroup/class |
| POST | `/api/instructors/lectures` | Instructor (approved) | Submit a new lecture (title, description, YouTube URL, target audience) |
| GET | `/api/instructors/lectures` | Instructor | View own submitted lectures & their status |
| GET | `/api/admin/instructors/pending` | Admin | List instructors awaiting approval |
| PATCH | `/api/admin/instructors/:id/approve` | Admin | Approve/reject an instructor |
| GET | `/api/admin/lectures/pending` | Admin | List lectures awaiting moderation |
| PATCH | `/api/admin/lectures/:id/review` | Admin | Approve/reject a lecture submission |

*(Full API documentation will be maintained via a Postman collection or Swagger spec as endpoints stabilize.)*

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MySQL Server (local instance or cloud-hosted)

### 1. Clone the repository
```bash
git clone https://github.com/ShaheerAhmedSiddiqui/EduStream-360-.git
cd edustream
```

### 2. Backend Setup
```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:
```env
PORT=5000
DB_NAME=edustream_db
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
JWT_SECRET=your_super_secret_jwt_key
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm start
```

---

## 🗺️ Roadmap

- [ ] Instructor-facing analytics on lecture views/engagement
- [ ] Quiz & assignment modules scoped by studyGroup/class
- [ ] Student progress dashboard with completion metrics
- [ ] Email notifications for approval/rejection events
- [ ] Admin analytics dashboard (platform-wide activity)
- [ ] Automated CNIC/email verification on registration

---

## 🤝 Contributing

Contributions are welcome. Fork the repo, create a feature branch, and open a pull request:

```bash
git checkout -b feature/your-feature-name
git commit -m "Add: your feature description"
git push origin feature/your-feature-name
```


---

<div align="center">

Built with ❤️ using Node.js, Express, MySQL & React

</div>
