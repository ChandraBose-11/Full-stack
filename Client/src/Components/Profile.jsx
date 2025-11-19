import { Alert, Button, Modal, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashProfile() {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    dob: "",
    password: "",
  });

  const [previewImage, setPreviewImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const filePickerRef = useRef();

  useEffect(() => {
    const loadUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/auth/me`, {
          credentials: "include",
        });
        const data = await res.json();

        if (res.ok) {
          setCurrentUser(data);
          setFormData({
            first_name: data.first_name,
            last_name: data.last_name,
            email: data.email,
            phone: data.phone,
            dob: data.dob?.split("T")[0] || data.dob,
            password: "",
          });

          setPreviewImage(
            data.profile_image
              ? "http://localhost:5000" + data.profile_image
              : null
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    loadUser();
  }, []);

  if (!currentUser) return <p className="text-center mt-10">Loading...</p>;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      uploadProfileImage(file);
    }
  };

  const uploadProfileImage = async (file) => {
    try {
      const form = new FormData();
      form.append("profile_image", file);

      const res = await fetch(
        `http://localhost:5000/api/auth/upload-profile_image`,
        {
          method: "POST",
          credentials: "include",
          body: form,
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Profile image updated");
      } else {
        setErrorMessage(data.message);
      }
    } catch (err) {
      setErrorMessage("Image upload failed");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(`http://localhost:5000/api/auth/update-profile`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Profile updated successfully");
        setCurrentUser((prev) => ({ ...prev, ...formData }));
      } else {
        setErrorMessage(data.message);
      }
    } catch (err) {
      setErrorMessage("Update failed");
    }

    setLoading(false);
  };

  const handleSignout = async () => {
    const res = await fetch(`http://localhost:5000/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) window.location.href = "/signin";
  };

  return (
    <div className="max-w-xl mx-auto p-10 m-20">
      <h1 className="text-center text-3xl font-bold mb-8 text-gray-800">
        Profile Settings
      </h1>
      <div className="bg-white shadow-lg rounded-xl p-8 border">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          <input
            type="file"
            accept="image/*"
            hidden
            ref={filePickerRef}
            onChange={handleImageChange}
          />

          {/* Profile Image */}
          <div
            className="w-36 h-36 rounded-full overflow-hidden shadow-lg cursor-pointer mx-auto border-4 border-gray-200 hover:scale-105 transition"
            onClick={() => filePickerRef.current.click()}
          >
            <img
              src={previewImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Fields */}
          <div className="grid grid-cols-2 gap-4">
            <TextInput
              id="first_name"
              defaultValue={formData.first_name}
              onChange={handleChange}
              className="w-full"
            />
            <TextInput
              id="last_name"
              defaultValue={formData.last_name}
              onChange={handleChange}
              className="w-full"
            />
          </div>

          <TextInput id="email" defaultValue={formData.email} disabled />
          <TextInput
            id="phone"
            defaultValue={formData.phone}
            onChange={handleChange}
          />
          <TextInput
            id="dob"
            type="date"
            defaultValue={formData.dob}
            onChange={handleChange}
          />
          <TextInput
            id="password"
            type="password"
            placeholder="New Password (optional)"
            onChange={handleChange}
          />

          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            disabled={loading}
            className="mt-3 py-2"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </form>

        {/* Delete + Logout */}
        <div className="flex justify-between text-red-600 mt-6 font-medium">
          <span
            onClick={handleSignout}
            className="cursor-pointer hover:underline"
          >
            Sign Out
          </span>
        </div>
      </div>

      {/* Alerts */}
      {successMessage && (
        <Alert color="success" className="mt-5">
          {successMessage}
        </Alert>
      )}
      {errorMessage && (
        <Alert color="failure" className="mt-5">
          {errorMessage}
        </Alert>
      )}
    </div>
  );
}
