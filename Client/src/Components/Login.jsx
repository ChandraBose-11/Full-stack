import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login=()=> {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.email || !formData.password) {
      return setErrorMessage("Please fill all the fields");
    }

    try {
      setLoading(true);

      const res = await fetch(
        "http://localhost:5000/api/auth/signin",
        {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      // Convert backend message → PDF requirement
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

      // Save user to localStorage (optional but useful)
      localStorage.setItem("user", JSON.stringify(data));

      setLoading(false);
      navigate("/profile"); // redirect to homepage

    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-blue-50 via-pink-50 to-purple-50 px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-3xl p-10 border border-gray-200">

        {/* Title */}
        <h1 className="text-center text-4xl font-bold text-gray-800">
          Welcome Back
        </h1>
        <p className="text-center text-gray-500 mt-2 mb-8">
          Sign in to access your account
        </p>

        {/* Form */}
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          
          {/* Email */}
          <div>
            <Label value="Email" className="text-gray-700" />
            <TextInput
              type="email"
              placeholder="example@mail.com"
              id="email"
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* Password */}
          <div>
            <Label value="Password" className="text-gray-700" />
            <TextInput
              type="password"
              placeholder="••••••••"
              id="password"
              onChange={handleChange}
              className="mt-1"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={loading}
            className="w-full py-2 text-md rounded-xl"
          >
            {loading ? (
              <>
                <Spinner size="sm" />
                <span className="pl-3">Signing In...</span>
              </>
            ) : (
              "Sign In"
            )}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-6 text-gray-600">
          <span className="text-sm">Don't have an account?</span>
          <Link
            to="/sign-up"
            className="ml-2 text-purple-600 font-semibold hover:underline"
          >
            Create Account
          </Link>
        </div>

        {/* Error Message */}
        {errorMessage && (
          <Alert className="mt-5" color="failure">
            {errorMessage}
          </Alert>
        )}
      </div>
    </div>
  );
}

export default  Login;