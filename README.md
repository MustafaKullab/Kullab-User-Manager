# Kullab User Manager

A simple user management dashboard built with **Vue 3** and **Pinia**, created as a practice project to demonstrate global state management, authentication flow, and CRUD operations.

This project was mainly built to apply and understand **Pinia state management in a real Vue application**.

---

## 🔑 Demo Login

To access the system, use the following credentials:

- **Username:** admin  
- **Password:** admin  

> After login, you will be redirected to the dashboard where you can manage users.

---

## 📌 Project Purpose

This project was developed as a hands-on practice to:

- Learn and apply **Pinia** as a state management solution
- Understand global state handling in Vue 3
- Build a simple authentication flow
- Implement basic CRUD operations (Create, Read, Update, Delete)
- Structure a small admin-style dashboard

---

## ⚙️ How It Works

### 1. Authentication
- The app starts with a login page.
- When the user enters valid credentials (admin/admin), authentication state is stored using **Pinia**.
- After login, the user gains access to the dashboard.

---

### 2. User Management
Inside the dashboard, the admin can:

- View all registered users
- Add new users
- Edit existing user information
- Delete users

All user data is managed globally using **Pinia stores**, which keeps the state consistent across the application.

---

### 3. State Management (Pinia)
- Pinia is used as the central store for:
  - Authentication state
  - Users data
  - UI state handling
- This eliminates prop drilling and simplifies state sharing between components.

---

## 🧱 Tech Stack

- Vue 3
- Pinia
- Vue Router
- Vite
- Bootstrap / UI Styling

---

## 🚀 Live Demo

https://kullab-user-management.vercel.app/

---

## 🎯 What I Learned

Through this project, I gained practical experience in:

- Using Pinia as a modern state management tool in Vue 3
- Structuring a small-scale frontend application
- Handling authentication flow in a frontend-only app
- Managing global state efficiently
- Building reusable components and clean architecture

---

## 📌 Note

This is a **demo project** created for learning purposes and does not include backend integration or real authentication security.
