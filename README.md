ScholarStream – Scholarship Management System

ScholarStream is a comprehensive platform connecting students with scholarship opportunities worldwide. It simplifies the scholarship search and application process while offering universities a robust platform to manage their listings.

🔗 Live Demo: https://scholar-stream-priyo.netlify.app/

🧑‍💻 Demo Accounts
Role	Email	Password
Admin	admin@gmail.com
	Hello@123
Student	student@gmail.com
	Student@123
Moderator	moderator@gmail.com
	Moderator@123
🌟 Purpose

ScholarStream aims to democratize education funding by aggregating scholarship data and streamlining applications.

It serves three main user roles:

Students: Search, view, and apply for scholarships.

Moderators/Admins: Manage listings, reviews, and users.

✨ Key Features
🎓 Students

Smart Search: Filter scholarships by university, degree, or country.

Dashboard: Track application status and reviews.

Payment Integration: Secure gateway for application fees.

Responsive Design: Mobile-friendly interface for on-the-go access.

🛡️ Admins & Moderators

Dashboard & Analytics: Visual insights with charts and graphs.

Scholarship Management: Add, edit, or delete listings.

Review System: Moderate user feedback.

User Management: Control roles and permissions.

🛠️ Technology Stack
Frontend

React – UI library

Vite – Fast build tooling

Tailwind CSS & DaisyUI – Styling and components

Key Libraries

Routing: react-router

State & Data Fetching: @tanstack/react-query

Forms: react-hook-form

Authentication: Firebase (with custom hooks)

UI & Animations: framer-motion, swiper, react-icons

Notifications: react-toastify, sweetalert2

Date Handling: dayjs

HTTP Client: axios (via useAxiosSecure)

🚀 Getting Started
Prerequisites

Node.js v18+

npm or yarn

Installation
git clone https://github.com/priyotush25/scholarStream-client.git
cd scholar-stream-client
npm install

Setup Environment

Create .env.local in the root folder with the following variables:

VITE_apiKey=your_api_key
VITE_authDomain=your_auth_domain
VITE_projectId=your_project_id
# Add other Firebase and API keys as needed

Run Development Server
npm run dev

Build for Production
npm run build

📄 License

This project is licensed under the MIT License.