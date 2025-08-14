# 🧭 WhereIsIt - Lost & Found Web Application

A full-stack Lost & Found platform built to connect people who have lost something valuable with those who may have found it. Users can report lost items, post found items, and recover their belongings through a seamless, secure, and user-friendly experience.

🔗 **Live Site:** [https://lost-and-found-item-74d5f.web.app/](https://lost-and-found-item-74d5f.web.app/)

---

## 🎯 Project Purpose

The goal of this project is to build a real-world full-stack web application that handles authentication, CRUD operations, secure user interaction, JWT token management, and seamless frontend-backend integration — all while maintaining a clean and professional UI.

This platform helps users:
- Post and find lost items
- Report found items and return them to rightful owners
- Track and manage their submitted items
- Authenticate securely via Firebase with email/password or Google login

---

## 🚀 Key Features

### 🔐 Authentication
- Firebase Email/Password Login
- Google Login
- JWT Token-Based Secure API Communication
- Protected Routes (Private Routing)

### 🖥️ Pages & Routes
- `/` → Home Page with banner, recent posts, and animations
- `/login` & `/register` → Auth pages with validation & animations
- `/addItems` → Post lost/found item (Private)
- `/allItems` → Browse all items with search filter
- `/items/:id` → Post details + recover modal (Private)
- `/myItems` → Manage user’s own items (Private)
- `/updateItems/:id` → Update item details (Private)
- `/allRecovered` → View all recovered items with layout toggle (Private)
- `*` → Custom 404 Not Found Page

### 📄 CRUD Operations
- Add, Update, Delete item posts
- Recover item with location & date
- View all posts and personal dashboard

### 📦 Data & Storage
- MongoDB (items & recoveredItems collections)
- Secure API via JWT Authentication
- Firebase user data management

### 🎨 UI & UX
- Fully responsive design (mobile, tablet, desktop)
- Soft gradient backgrounds and modern layout
- Framer Motion Animations
- Loading spinners & toast notifications
- Clean and meaningful UI messages

### 🧩 Bonus Features
- Search by Title or Location
- Layout toggle in recovered items page
- Eye-catching register/login page with Lottie animation
- Dynamic Page Title for better SEO

---

## 🔧 Tech Stack

### 🔹 Client (Frontend)
- React.js
- React Router DOM
- Tailwind CSS + DaisyUI
- Framer Motion
- Lottie React
- Axios
- React Datepicker
- React Hook Form
- React Toastify

### 🔸 Server (Backend)
- Express.js
- MongoDB
- CORS
- dotenv
- JSON Web Token (JWT)

---

## 🔐 Environment Variables (.env)

### 🔹 Client
