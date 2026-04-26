# Kullab User Manager

A simple user management dashboard built with **Vue 3** and **Pinia**, developed as a practical project to demonstrate global state management, authentication flow, and CRUD operations in a real Vue application.

The main focus of this project is to apply and understand **Pinia** as a state management solution in a structured frontend application.

---

## 🔑 Demo Login

To access the system, use the following credentials:

- **Username:** admin  
- **Password:** admin  

> After logging in, you will be redirected to the dashboard where you can manage users.

---

## 📌 Project Purpose

This project was built as a learning exercise to:

- Practice and understand **Pinia state management**
- Build a basic authentication flow (login & signup)
- Handle global state across multiple pages
- Implement CRUD operations (Create, Read, Update, Delete)
- Simulate a simple admin-style user management system

---

## ⚙️ How It Works

### 1. Authentication System
- The application starts with **Login / Signup pages**
- On successful login, the authentication state is stored using **Pinia**
- Only authenticated users can access the dashboard

---

### 2. Signup Flow
- When a new user signs up, their data is automatically stored
- The registered user is then added to the **global users list**
- This means every new signup appears immediately inside the dashboard **Users page**
- This simulates how user registration would be reflected in a real admin system

---

### 3. User Management Dashboard
Inside the dashboard, the admin can:

- View all users (including newly registered users)
- Add users manually
- Edit user information
- Delete users

All data is managed globally using **Pinia stores**, ensuring consistency across the application.

---

### 4. State Management (Pinia)
Pinia is used as the central state manager for:

- Authentication state (logged in / logged out)
- Users data (including signup-generated users)
- Application state synchronization across components

This removes the need for prop drilling and simplifies state handling.

---

## 🧱 Tech Stack

- Vue 3
- Pinia
- Vue Router
- Vite
- Bootstrap / Custom Styling

---

## 🚀 Live Demo

https://kullab-user-management.vercel.app/

---

## 🎯 What I Learned

Through this project, I gained practical experience in:

- Using **Pinia** for real-world state management
- Structuring a Vue 3 application properly
- Handling authentication flow in frontend applications
- Connecting signup flow with global state (users list)
- Building clean and reusable components
- Managing CRUD operations in a reactive system

---

## 📌 Note

This is a **learning/demo project**, built to practice frontend development concepts.  
It does not include backend integration or real production-level authentication security.
