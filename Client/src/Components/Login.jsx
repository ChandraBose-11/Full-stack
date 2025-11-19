import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill all the fields");
    }

    try {
      setLoading(true);

      const res = await fetch("http://localhost:5000/api/auth/signin", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (
        data.message === "Invalid User" ||
        data.message === "Invalid Password"
      ) {
        setLoading(false);
        return setErrorMessage("Invalid email or password");
      }

      if (!res.ok) {
        setLoading(false);
        return setErrorMessage(data.message || "Login failed");
      }

      localStorage.setItem("user", JSON.stringify(data));
      window.dispatchEvent(new Event("userChanged"));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 px-4">
      {/* CARD CONTAINER */}
      <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8 relative overflow-hidden">
        {/* TOP ACCENT BAR */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

        {/* ICON HEADER */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex justify-center items-center mx-auto shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9 text-white"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14c-4.418 0-8 2.239-8 5v1h16v-1c0-2.761-3.582-5-8-5z"
              />
            </svg>
          </div>

          <h1 className="text-3xl font-bold text-gray-800 mt-4">Login</h1>
          <p className="text-gray-500 text-sm mt-1">
            Access your account securely
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* EMAIL */}
          <div>
            <Label value="Email" className="text-gray-700 font-medium mb-1" />
            <TextInput
              id="email"
              type="email"
              placeholder="example@mail.com"
              onChange={handleChange}
              className="focus:ring-indigo-500"
            />
          </div>

          {/* PASSWORD */}
          <div>
            <Label
              value="Password"
              className="text-gray-700 font-medium mb-1"
            />
            <TextInput
              id="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              className="focus:ring-indigo-500"
            />
          </div>

          {/* LOGIN BUTTON */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 shadow-md hover:shadow-lg transition"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="ml-2">Signing In...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* ERROR ALERT */}
        {errorMessage && (
          <Alert color="failure" className="mt-5">
            {errorMessage}
          </Alert>
        )}

        {/* FOOTER */}
        <p className="text-center mt-6 text-gray-600">
          Don’t have an account?
          <Link
            to="/register"
            className="ml-2 text-indigo-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
