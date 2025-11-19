import React from "react";

const About = () => {
  const backendPackages = [
    "bcryptjs",
    "cookie-parser",
    "cors",
    "dotenv",
    "express",
    "jsonwebtoken",
    "multer",
    "mysql2",
    "nodemon",
  ];

  const frontendPackages = [
    "tailwindcss",
    "flowbite-react",
    "react",
    "react-dom",
    "react-router-dom",
    "react-icons",
  ];

  const features = [
    {
      title: "Registration",
      text: "Create an account with personal details and profile image upload.",
    },
    {
      title: "Login",
      text: "Secure login using bcrypt password validation.",
    },
    {
      title: "Profile Page",
      text: "Update profile details & profile picture easily.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4 py-16 flex justify-center mt-10">
      <div className="w-full max-w-5xl text-center">
        {/* HEADER */}
        <h1 className="text-4xl font-bold text-gray-800">Full Stack Task</h1>
        <h2 className="text-2xl mt-2 font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-transparent bg-clip-text">
          Profile Page with Login & Register
        </h2>

        <p className="text-gray-600 max-w-2xl mx-auto mt-5 text-base leading-relaxed">
          A complete authentication system built using React, Node.js, Express,
          and MySQL, supporting secure login, user registration, and profile
          management.
        </p>

        {/* FEATURES SECTION */}
        <section className="mt-14">
          <h3 className="text-xl font-semibold text-gray-800 mb-6">
            🌟 Core Features
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((item, index) => (
              <div
                key={index}
                className="bg-white/80 p-6 rounded-2xl shadow-md border backdrop-blur-sm 
                transition hover:shadow-lg hover:scale-[1.02]"
              >
                <h4 className="text-lg font-semibold text-purple-700">
                  {item.title}
                </h4>
                <p className="text-gray-600 text-sm mt-2">{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TECH STACK SECTION */}
        <section className="mt-16">
          <h3 className="text-xl font-semibold text-gray-800 mb-8">
            🛠️ Technology Stack Used
          </h3>

          {/* BACKEND */}
          <div className="bg-white/70 p-8 rounded-3xl shadow-md border backdrop-blur-sm mb-10">
            <h4 className="text-lg font-semibold text-purple-700 text-left">
              Backend Packages
            </h4>

            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {backendPackages.map((pkg) => (
                <span
                  key={pkg}
                  className="px-4 py-1.5 rounded-full bg-purple-100 text-purple-800 
                  text-xs font-medium shadow-sm border border-purple-200"
                >
                  {pkg}
                </span>
              ))}
            </div>
          </div>

          {/* FRONTEND */}
          <div className="bg-white/70 p-8 rounded-3xl shadow-md border backdrop-blur-sm">
            <h4 className="text-lg font-semibold text-pink-600 text-left">
              Frontend Packages
            </h4>

            <div className="flex flex-wrap gap-3 mt-4 justify-center">
              {frontendPackages.map((pkg) => (
                <span
                  key={pkg}
                  className="px-4 py-1.5 rounded-full 
                  bg-gradient-to-r from-pink-100 to-purple-100
                  text-purple-800 text-xs font-medium 
                  shadow-sm border border-pink-200"
                >
                  {pkg}
                </span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
