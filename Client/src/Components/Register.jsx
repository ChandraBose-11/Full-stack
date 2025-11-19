import {
  Alert,
  Button,
  Label,
  Spinner,
  TextInput,
  FileInput,
} from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
  });

  const [profileImage, setProfileImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(),
    });
  };

  const handleFileChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.first_name.match(/^[A-Za-z]+$/))
      return setErrorMessage("First name must contain only letters");
    if (!formData.last_name.match(/^[A-Za-z]+$/))
      return setErrorMessage("Last name must contain only letters");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      return setErrorMessage("Invalid email format");
    if (!/^[0-9]{10}$/.test(formData.phone))
      return setErrorMessage("Phone number must be 10 digits");
    if (formData.password.length < 6)
      return setErrorMessage("Password must be at least 6 characters");
    if (isNaN(new Date(formData.dob).getTime()))
      return setErrorMessage("Invalid date of birth");

    try {
      setLoading(true);
      setErrorMessage(null);

      const fd = new FormData();
      Object.entries(formData).forEach(([key, value]) => fd.append(key, value));
      if (profileImage) fd.append("profile_image", profileImage);

      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        credentials: "include",
        body: fd,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Signup failed");

      setLoading(false);
      navigate("/login");
    } catch (error) {
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center py-10 px-5 mt-10">
      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT SIDE — ILLUSTRATION AREA */}
        <div className="hidden md:flex items-center justify-center bg-gradient-to-br from-purple-500 to-indigo-600 p-10">
          <div className="text-white text-center">
            <h2 className="text-3xl font-bold mb-4 drop-shadow-md">
              Create Your Account
            </h2>
            <p className="text-white/90">
              Join our amazing community in just a few steps.
            </p>
          </div>
        </div>

        {/* RIGHT SIDE — FORM */}
        <div className="p-10 bg-white">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
           REGISTER
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">

            {/* FIRST NAME */}
            <div>
              <Label value="First Name" className="font-medium text-gray-700" />
              <TextInput id="first_name" placeholder="First Name" onChange={handleChange} />
            </div>

            {/* LAST NAME */}
            <div>
              <Label value="Last Name" className="font-medium text-gray-700" />
              <TextInput id="last_name" placeholder="Last Name" onChange={handleChange} />
            </div>

            {/* EMAIL */}
            <div className="md:col-span-2">
              <Label value="Email" className="font-medium text-gray-700" />
              <TextInput id="email" type="email"placeholder="Email"  onChange={handleChange} />
            </div>

            {/* PHONE */}
            <div>
              <Label value="Phone Number" className="font-medium text-gray-700" />
              <TextInput id="phone" maxLength="10" placeholder="Phone Number" onChange={handleChange} />
            </div>

            {/* DOB */}
            <div>
              <Label value="Date of Birth" className="font-medium text-gray-700" />
              <TextInput id="dob" type="date" placeholder="Date Of Birth" onChange={handleChange} />
            </div>

            {/* PASSWORD */}
            <div className="md:col-span-2">
              <Label value="Password" className="font-medium text-gray-700" />
              <TextInput id="password" type="password" placeholder="Password" onChange={handleChange} />
            </div>

            {/* PROFILE IMAGE */}
            <div className="md:col-span-2">
              <Label value="Profile Image (Optional)" className="font-medium text-gray-700" />
              <FileInput accept="image/*" placeholder="Upload Image" onChange={handleFileChange} />
            </div>

            {/* SUBMIT BUTTON */}
            <div className="md:col-span-2 mt-2">
              <Button
                type="submit"
                disabled={loading}
                className="w-full py-2 rounded-xl shadow-md hover:shadow-lg transition"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" />
                    <span className="pl-3">Creating account...</span>
                  </>
                ) : (
                  "Create Account"
                )}
              </Button>
            </div>
          </form>

          {/* ERROR MESSAGE */}
          {errorMessage && (
            <Alert color="failure" className="mt-5">
              {errorMessage}
            </Alert>
          )}

          {/* FOOTER */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm">
              Already have an account?
              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:underline ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Register;
