# 🚀 SyncroTask SaaS - Professional Task Management Suite

**SyncroTask** is a high-performance, multi-tenant Task Management platform built with the **PERN stack** (PostgreSQL, Express, React, Node.js). It demonstrates a full-stack implementation of secure session management, relational data modeling, and a modern "Glassmorphism" user interface.

---

## 🌟 Key Features
* **Secure Auth Layer**: Implemented industry-standard JWT (JSON Web Tokens) and `bcrypt` hashing.
* **Multi-Tenant Architecture**: Robust data isolation ensuring users only access their own data.
* **Modern SaaS UX**: Reactive dashboard with mesh-gradient aesthetics and real-time filtering.
* **Scalable Backend**: Engineered using the **MVC (Model-View-Controller)** pattern.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology | Key Usage |
| :--- | :--- | :--- |
| **Frontend** | React 18+ (Vite) | Component-based UI & Client-side routing |
| **Backend** | Node.js / Express | RESTful API & Security Middleware |
| **Database** | PostgreSQL / SQLite | Relational data storage |
| **ORM** | Sequelize | Schema migrations & Type-safe queries |
| **Styling** | CSS-in-JS | Glassmorphism & Animated Backgrounds |

---

## 📂 Architecture Overview
The project follows a modular architecture to ensure code reusability:
* **Models**: Define the relational schema and entity relationships.
* **Controllers**: Manage business logic and the request/response cycle.
* **Middleware**: Handle JWT verification and "Guard Clause" validation.
* **Routes**: Define the secure API surface area.

---

## ⚙️ Local Installation & Setup

### 1. Backend Configuration
1. Navigate to directory: `cd backend`
2. Install dependencies: `npm install`
3. Create a `.env` file and add:
   ```env
   PORT=5000
   DATABASE_URL=your_postgres_url
   JWT_SECRET=your_secure_secret_key