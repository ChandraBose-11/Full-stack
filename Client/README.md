# Full Stack Application

A full-stack web application built with React and Node.js/Express, featuring user authentication, profile management, and a modern UI with Tailwind CSS and Flowbite React components.

## 🚀 Tech Stack

### Frontend (Client)
- **React** 19.2.0 - UI library
- **Vite** 7.2.2 - Build tool and dev server
- **React Router DOM** 7.9.6 - Client-side routing
- **Tailwind CSS** 4.1.17 - Utility-first CSS framework
- **Flowbite React** 0.12.10 - Component library
- **React Icons** 5.5.0 - Icon library

### Backend (Server)
- **Node.js** with Express 4.18.2 - Web framework
- **MySQL2** 3.3.0 - Database
- **JWT** (jsonwebtoken 9.0.2) - Authentication
- **bcryptjs** 3.0.3 - Password hashing
- **Multer** 1.4.5 - File upload handling
- **CORS** - Cross-origin resource sharing
- **Cookie Parser** - Cookie handling
- **dotenv** - Environment variables

## 📁 Project Structure

```
Full-stack/
├── Client/              # Frontend React application
│   ├── src/
│   │   ├── Components/  # React components
│   │   ├── App.jsx      # Main app component
│   │   ├── main.jsx     # Entry point
│   │   └── index.css    # Global styles
│   ├── public/          # Static assets
│   ├── index.html       # HTML template
│   └── package.json     # Frontend dependencies
│
└── Server/              # Backend Node.js application
    ├── Route/           # API routes
    ├── Controller.jsx   # Controller logic
    ├── Middleware/      # Custom middleware
    ├── Database/        # Database configuration
    ├── uploads/         # File upload storage
    ├── index.js         # Server entry point
    └── package.json     # Backend dependencies
```

## 🎯 Features

- **User Authentication** - Login and registration with JWT
- **User Profile** - View and manage user profiles
- **File Upload** - Profile picture/file upload functionality
- **Protected Routes** - Secure routes with authentication
- **Responsive Design** - Mobile-friendly UI with Tailwind CSS
- **Modern UI Components** - Pre-built components with Flowbite React

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- npm or yarn package manager

### Backend Setup

1. Navigate to the Server directory:
```bash
cd Server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the Server directory:
```env
PORT=5000
DB_HOST=localhost
DB_USER=your_mysql_user
DB_PASSWORD=your_mysql_password
DB_NAME=your_database_name
JWT_SECRET=your_jwt_secret_key
```

4. Start the server:
```bash
# Development mode with auto-reload
npm run dev

# Production mode
npm start
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the Client directory:
```bash
cd Client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The client will run on `http://localhost:5173`

## 🔧 Available Scripts

### Client
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Server
- `npm run dev` - Start with nodemon (auto-reload)
- `npm start` - Start production server

## 🌐 API Endpoints

### Authentication Routes (`/api/auth`)
- Authentication and user management endpoints

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication with HTTP-only cookies for secure token storage.

## 📝 Environment Variables

### Server
Create a `.env` file in the Server directory with:
- `PORT` - Server port number
- `DB_HOST` - MySQL host
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT signing

## 🚦 CORS Configuration

The backend is configured to accept requests from `http://localhost:5173` with credentials support.

## 📦 Build & Deployment

### Frontend
```bash
cd Client
npm run build
```
Build output will be in the `dist/` directory.

### Backend
```bash
cd Server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 👥 Pages

- **Home** - Landing page
- **About** - About page
- **Login** - User login
- **Register** - User registration
- **Profile** - User profile management (protected route)
