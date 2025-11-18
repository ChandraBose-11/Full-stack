import express from "express"
import { signin, signup,getCurrentUser,uploadProfileImage,updateProfile,logout } from "../Controller.jsx/authController.js"
import upload from "../Middleware/fileupload.js"
import auth from "../Middleware/auth.js"


const router =express.Router()

router.post("/signup",upload.single("profile_image"),signup)
router.post("/signin",signin)
router.get("/me",auth,getCurrentUser)
router.post("/upload-profile_image",auth,upload.single("profile_image"),uploadProfileImage)
router.put("/update-profile", auth, updateProfile);
router.get("/logout", logout);

export default  router;