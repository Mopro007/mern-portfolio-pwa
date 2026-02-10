# MERN Portfolio PWA

## 🚀 Overview
A modern, high-performance portfolio website built with the **MERN stack** (MongoDB, Express.js, React, Node.js). It features a fully responsive design, **Progressive Web App (PWA)** capabilities for offline access and installability, and a comprehensive **Admin Dashboard** for dynamic content management.

![Portfolio Preview](https://via.placeholder.com/800x400?text=Portfolio+Preview+Placeholder)

## ✨ Key Features

### 🎨 Public Interface
-   **Modern UI/UX**: Built with React, Tailwind CSS, and Framer Motion for smooth animations.
-   **PWA Integrations**: Installable on mobile/desktop, offline support, and app-like experience.
-   **Dynamic Content**: All sections (Hero, About, Portfolio, Services, Contact) are fetched dynamically from the backend.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
-   **Interactive Elements**: 3D Tilt effects, scroll animations, and dynamic counters.
-   **Fast Performance**: Optimized build with Vite.

### 🛡️ Admin Dashboard
-   **Secure Authentication**: Protected admin routes with JWT authentication.
-   **Profile Management**: Update bio, skills, services, experience, education, social links, and contact info via an intuitive UI.
-   **Project Management**: Full CRUD operations for portfolio projects with image uploads.
-   **Media Management**: Direct integration with **Cloudinary** for managing profile pictures, resumes, and project thumbnails.
-   **Real-time Updates**: Changes made in the dashboard reflect immediately on the public site.

## 🛠️ Tech Stack

### Frontend
-   **React.js**: Component-based UI library
-   **Vite**: Next-generation frontend tooling
-   **Tailwind CSS**: Utility-first CSS framework
-   **Framer Motion**: Production-ready animation library
-   **Lucide React**: Beautiful & consistent icons
-   **Vite PWA Plugin**: Zero-config PWA integration

### Backend
-   **Node.js**: JavaScript runtime environment
-   **Express.js**: Fast, unopinionated web framework
-   **MongoDB**: NoSQL database for flexible data storage
-   **Mongoose**: OCDM library for MongoDB
-   **Multer + Cloudinary**: Robust file uploading and storage solution

## ⚙️ Installation & Setup

### Prerequisites
-   Node.js (v14 or higher)
-   MongoDB (Local instance or MongoDB Atlas URI)
-   Cloudinary Account (for image hosting)

### 1. Clone the Repository
```bash
git clone https://github.com/Mopro007/mern-portfolio-pwa.git
cd mern-portfolio-pwa
```

### 2. Backend Setup
Navigate to the server directory and install dependencies:
```bash
cd server
npm install
```

Create a `.env` file in the `server` directory and configure your environment variables:
```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio_db
JWT_SECRET=your_super_secret_jwt_key
ADMIN_USERNAME=admin
ADMIN_PASSWORD=secure_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start the backend server:
```bash
npm run dev
```

### 3. Frontend Setup
Open a new terminal, navigate to the client directory, and install dependencies:
```bash
cd client
npm install
```

Start the frontend development server:
```bash
npm run dev
```

The application should now be running at `http://localhost:3000` (or the port specified by Vite).

## 📂 Project Structure

```bash
mern-portfolio-pwa/
├── client/                 # React Frontend
│   ├── public/             # Static assets (favicons, manifest)
│   ├── src/
│   │   ├── components/     # Reusable UI components (Hero, Navbar, etc.)
│   │   ├── context/        # React Context (AuthContext)
│   │   ├── hooks/          # Custom Hooks (useData)
│   │   ├── pages/          # Page components (Home, About, Admin pages)
│   │   ├── main.jsx        # Entry point
│   │   └── index.css       # Tailwind imports
│   └── vite.config.js      # Vite & PWA Configuration
│
├── server/                 # Node.js Backend
│   ├── middleware/         # Custom Middleware (Auth, Uploads)
│   ├── models/             # Mongoose Schemas (Profile, Project)
│   ├── routes/             # API Routes
│   └── server.js           # Express App Setup
│
└── README.md               # Project Documentation
```

## 🔒 Admin Access
To access the admin dashboard:
1.  Navigate to `/secret-admin-login` in your browser (e.g., `http://localhost:3000/secret-admin-login`).
2.  Login using the credentials defined in your `.env` file (`ADMIN_USERNAME` and `ADMIN_PASSWORD`).
3.  Once logged in, you can manage all aspects of your portfolio.

## 🚀 Deployment

### Client (Frontend)
Build the frontend for production:
```bash
cd client
npm run build
```
The output will be in the `client/dist` folder, which can be deployed to static hosts like Vercel, Netlify, or served by the backend.

### Server (Backend)
Deploy the server to platforms like Render, Railway, or Heroku. Ensure you add all environment variables to your deployment platform's configuration.

## 🤝 Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to fork the repository and submit a pull request.

## 📄 License
This project is licensed under the MIT License.
