import React from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 flex flex-col items-center px-6 py-20 mt-10">

      {/* Hero Section */}
      <div className="max-w-3xl text-center mx-auto">
        <h1 className="text-5xl font-bold text-gray-800 drop-shadow-sm leading-snug">
          Full Stack Task:
          <span className="block bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent mt-2">
            Profile Page with Login & Register
          </span>
        </h1>

        <p className="mt-6 text-gray-600 text-lg leading-relaxed px-2 md:px-10">
          This project demonstrates a full authentication flow including
          <strong> Signup</strong>, <strong>Signin</strong>, and a personalized
          <strong> User Profile Page</strong> using a modern full-stack approach
          with JWT Authentication, Redux, Axios, and React Router.
        </p>
      </div>

     
  

      {/* Feature Cards */}
      <div className="mt-20 w-full flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-5xl w-full px-4">

          {/* Card 1 */}
          <div className="bg-white/70 p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold text-gray-700">🔐 Secure Login</h3>
            <p className="text-gray-500 mt-2">
              Sign in using protected authentication with cookies & JWT.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/70 p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold text-gray-700">📝 Register Easily</h3>
            <p className="text-gray-500 mt-2">
              Create a new account using email, password & user profile details.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/70 p-6 rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition text-center">
            <h3 className="text-xl font-semibold text-gray-700">👤 Profile Page</h3>
            <p className="text-gray-500 mt-2">
              Access your personal dashboard after successful authentication.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Home;
