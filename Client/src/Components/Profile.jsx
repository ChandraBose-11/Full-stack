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

  // ----------------------------------------------------
  // ⭐ LOAD CURRENT USER
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // ⭐ IMAGE PREVIEW + FILE SELECT
  // ----------------------------------------------------
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);

    if (file) {
      setPreviewImage(URL.createObjectURL(file));
      uploadProfileImage(file); // upload immediately
    }
  };

  // ----------------------------------------------------
  // ⭐ UPLOAD IMAGE TO SEPARATE API
  // ----------------------------------------------------
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

  // ----------------------------------------------------
  // ⭐ HANDLE TEXT INPUT CHANGES
  // ----------------------------------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // ----------------------------------------------------
  // ⭐ UPDATE USER PROFILE (NO IMAGE)
  // ----------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res = await fetch(
        `http://localhost:5000/api/auth/update-profile`,
        {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setSuccessMessage("Profile updated successfully");

        setCurrentUser((prev) => ({
          ...prev,
          ...formData,
        }));
      } else {
        setErrorMessage(data.message);
      }
    } catch (err) {
      setErrorMessage("Update failed");
    }

    setLoading(false);
  };

  // ----------------------------------------------------
  // ⭐ SIGN OUT
  // ----------------------------------------------------
  const handleSignout = async () => {
    const res = await fetch(`http://localhost:5000/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) window.location.href = "/signin";
  };

  // ----------------------------------------------------
  // ⭐ DELETE USER
  // ----------------------------------------------------
  const handleDelete = async () => {
    setShowModal(false);

    const res = await fetch(`http://localhost:5000/api/auth/delete`, {
      method: "DELETE",
      credentials: "include",
    });

    if (res.ok) window.location.href = "/signin";
  };

  // ----------------------------------------------------
  // ⭐ RENDER COMPONENT
  // ----------------------------------------------------
  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="text-center text-3xl font-semibold my-7">Profile</h1>

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* IMAGE UPLOAD */}
        <input
          type="file"
          accept="image/*"
          hidden
          ref={filePickerRef}
          onChange={handleImageChange}
        />

        <div
          className="w-32 h-32 rounded-full overflow-hidden shadow-md cursor-pointer mx-auto"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={previewImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* INPUT FIELDS */}
        <TextInput
          id="first_name"
          defaultValue={formData.first_name}
          onChange={handleChange}
        />
        <TextInput
          id="last_name"
          defaultValue={formData.last_name}
          onChange={handleChange}
        />
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

        <Button type="submit" gradientDuoTone="purpleToBlue" disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </form>

      {/* DELETE + LOGOUT */}
      <div className="flex justify-between text-red-500 mt-5">
        <span onClick={() => setShowModal(true)} className="cursor-pointer">
          Delete Account
        </span>
        <span onClick={handleSignout} className="cursor-pointer">
          Sign Out
        </span>
      </div>

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

      {/* CONFIRM DELETE MODAL */}
      <Modal show={showModal} onClose={() => setShowModal(false)} popup size="md">
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="w-14 h-14 mx-auto text-gray-500 mb-4" />
            <h3 className="text-lg mb-5">
              Are you sure you want to delete your account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDelete}>
                Yes, delete
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
