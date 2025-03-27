# 🍽️ Cook the Code - Campus Event Finder & RSVP System

## 📌 Project Overview
**Cook the Code** is a centralized platform that simplifies event discovery and RSVP management for college students. It allows students to explore upcoming campus events, register, and manage RSVPs seamlessly.

## ✨ Features Implemented
### 🎨 Frontend (Next.js + TypeScript)
- **Event Listing & Search**: Users can browse events with filtering options (date, category, club, etc.).
- **Event Details Page**: Displays full event information, including descriptions, media, and RSVP options.
- **Event Bookmarking & Calendar Sync**: Students can bookmark events and sync them with their personal calendars.
- **QR Code Check-in System**: Auto-generates QR codes for registered students for easy check-in at events.
- **Dark Mode Toggle**: Enhances accessibility with a light/dark mode switch.
- **In-App Announcements**: Displays important event deadlines and major campus updates.
- **Feedback & Review System**: Attendees can rate and review past events.
- **Club Profile Pages**: Allows clubs to showcase their events and media.

### 🛠️ Tech Stack (Frontend)
- **Framework:** Next.js (React) with TypeScript
- **UI Components:** Tailwind CSS + ShadCN/UI
- **State Management:** useState + Context API
- **Authentication:** Firebase Authentication (via student emails)
- **Hosting:** Vercel

## 🔥 Backend (FastAPI + SQL) *(Currently Non-Functional)*
We initially planned to implement a **FastAPI backend** with **SQL (PostgreSQL)** for event storage and management. However, due to time constraints, we were unable to complete the backend integration. The original plan included:
- **Event Management API**: CRUD operations for event creation, updates, and deletions.
- **RSVP System**: Storing user RSVPs and generating QR codes.
- **Automated Email Reminders**: Sending event reminders to registered users.
- **Multi-Role Access for Clubs**: Allowing multiple club representatives to manage events.

### 🛠️ Tech Stack (Backend - Not Fully Implemented)
- **Backend Framework:** FastAPI (Python)
- **Database:** PostgreSQL
- **Authentication:** Firebase Auth (JWT tokens for API security)
- **Deployment (Planned):** Railway.app or Firebase Cloud Functions

## 🚀 Future Improvements
- Complete backend API and integrate it with the frontend.
- Enhance the RSVP and notification system.
- Implement analytics for event engagement and participation.
- Add real-time chat for event discussions.

## 📜 How to Run the Project (Frontend)
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo-name/cook-the-code.git
   cd cook-the-code
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run the development server:
   ```sh
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📌 Conclusion
Although the backend is incomplete, the frontend provides a functional event discovery and RSVP system. Future updates will include backend integration for a fully operational event management platform.
