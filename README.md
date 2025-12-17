# ScholarStream - Scholarship Management System

ScholarStream is a comprehensive web application designed to connect students with scholarship opportunities worldwide. It simplifies the scholarship search and application process while providing universities with a robust platform to manage their listings.

## 🔗 Live URL
**[Click Here](https://scholar-stream-791d1.web.app/)**

## 🌟 Purpose
The goal of ScholarStream is to democratize education funding by aggregating scholarship data and offering streamlined application workflows. It serves three main user roles:
- **Students**: Search, view, and apply for scholarships.
- **Moderators/Admins**: Manage listings, reviews, and users.

## ✨ Key Features

### 🎓 For Students
- **Smart Search**: Filter scholarships by university, degree, or country.
- **Dashboard**: Track application statuses and reviews.
- **Payment Integration**: Secure payment gateway for application fees.
- **Responsive Design**: Mobile-friendly interface for on-the-go access.

### 🛡️ For Admins & Moderators
- **Dashboard & Analytics**: Visual insights (charts/graphs) on applications and user growth.
- **Scholarship Management**: Add, edit, or delete scholarship listings.
- **Review System**: Moderate feedback and reviews from users.
- **User Management**: Manage user roles and permissions.

## 🛠️ Technology Stack

### Frontend Core
- **[React](https://react.dev/)**: Javascript library for building user interfaces.
- **[Vite](https://vitejs.dev/)**: Next-generation frontend tooling for fast builds.
- **[Tailwind CSS](https://tailwindcss.com/)**: Utility-first CSS framework for styling.
- **[DaisyUI](https://daisyui.com/)**: Component library for Tailwind CSS.

### Key Libraries & Packages
- **Routing**: `react-router`
- **State & Data Fetching**: `@tanstack/react-query`
- **Forms**: `react-hook-form`
- **Authentication**: `firebase` (Integrated via custom hooks)
- **UI & Animations**: `framer-motion`, `swiper` (sliders), `react-icons`
- **Notifications**: `react-toastify`, `sweetalert2`
- **Date Handling**: `dayjs`
- **HTTP Client**: `axios` (Integrated via `useAxiosSecure`)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/armanislams/scholar-stream-client.git 
   cd scholar-stream-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the root directory and add your Firebase/Backend keys:
   ```env
   VITE_apiKey=your_api_key
   VITE_authDomain=your_auth_domain
   VITE_projectId=your_project_id
   ...
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

## 📄 License
This project is licensed under the MIT License.
