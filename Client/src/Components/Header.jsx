import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX, FiLogOut, FiUser } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Load user from localStorage & listen for updates
  useEffect(() => {
    const loadUser = () => {
      const savedUser = JSON.parse(localStorage.getItem("user"));
      setUser(savedUser);
    };

    loadUser(); // Initial load

    // Listen for login/logout updates
    window.addEventListener("userChanged", loadUser);

    return () => {
      window.removeEventListener("userChanged", loadUser);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");

    // Notify header to update
    window.dispatchEvent(new Event("userChanged"));

    navigate("/login");
  };

  return (
    <header className="backdrop-blur-md bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 shadow-md fixed top-0 left-0 w-full z-50 border-b border-gray-200">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-3 px-5">

        {/* LOGO */}
        <Link to="/" className="text-3xl font-extrabold tracking-tight">
          <span className="text-indigo-600">My</span>
          <span className="text-gray-800">Task</span>
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link className="hover:text-indigo-600 transition" to="/">Home</Link>
          <Link className="hover:text-indigo-600 transition" to="/about">About</Link>

          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-full shadow hover:bg-indigo-700">
                <FaUserCircle size={22} />
                {user?.username || "Account"}
              </button>

              {/* DROPDOWN */}
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white shadow-lg rounded-xl w-44 py-2 border border-gray-100">
                <Link
                  to="/profile"
                  className="block px-4 py-2 hover:bg-gray-100 transition"
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 flex items-center gap-2 text-left text-red-600 hover:bg-gray-100 transition"
                >
                  <FiLogOut /> Logout
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-full hover:bg-indigo-600 hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                Sign Up
              </Link>
            </div>
          )}
        </nav>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-indigo-600 text-3xl"
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* MOBILE DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-md animate-slideDown">
          <div className="flex flex-col p-4 gap-4 text-lg">

            <Link onClick={() => setMenuOpen(false)} to="/" className="hover:text-indigo-600">
              Home
            </Link>

            <Link onClick={() => setMenuOpen(false)} to="/about" className="hover:text-indigo-600">
              About
            </Link>

            {user ? (
              <>
                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium flex items-center gap-2 hover:text-indigo-600"
                >
                  <FiUser /> My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium hover:text-indigo-600"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="font-medium hover:text-indigo-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
