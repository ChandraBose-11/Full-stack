import bcrypt from "bcryptjs"
import db from "../Database/db.js"
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const { first_name, last_name, email, phone, dob, password } = req.body;
        const profile_image = req.file ? `/upload/${req.file.filename}` : null;

        // Validate required fields
        if (!first_name || !last_name || !email || !phone || !dob || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // validation first_name and last_name (only letters)
        if (!/^[A-Za-z]+$/.test(first_name)) {
            return res
                .status(400)
                .json({ message: "First name must contain only letters" });
        }
        if (!/^[A-Za-z]+$/.test(last_name)) {
            return res
                .status(400)
                .json({ message: "Last name must contain only letters" });
        }

        // Validation email format
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validation phone (10 digits)
        if (!/^[0-9]{10}$/.test(phone)) {
            return res
                .status(400)
                .json({ message: "Phone number must be 10 digits" });
        }

        //  Date validation
        if (isNaN(new Date(dob).getTime())) {
            return res.status(400).json({ message: "Invalid date of birth" });
        }

        // Validate password length
        if (password.length < 6) {
            return res
                .status(400)
                .json({ message: "Password must be at least 6 characters long" });
        }

        //check if user already exists

        const existingUser = await db.query("SELECT * FROM users WHERE email=?", [
            email,
        ]);
        if (existingUser[0].length > 0) {
            return res.status(400).json({ message: "User already exists" });
        }
        //hash password before storing in database
        const hashedPassword = await bcrypt.hash(password, 10);
        //store user in database
        const result = await db.query(
            "INSERT INTO users (first_name, last_name, email, phone, dob, password, profile_image) VALUES (?,?,?,?,?,?,?)",
            [first_name, last_name, email, phone, dob, hashedPassword, profile_image]
        );
        //201 created new record
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res
            .status(500)
            .json({ message: "Internal Server Error", error: error.message });
    }
};

export const signin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const [users] = await db.query("SELECT * FROM users WHERE email=?", [email])
        //    console.log(users);
        //check user is available
        if (users.length === 0) {
            return res.status(400).json({ message: "Invalid User" })
        }

        //verify password
        const user = users[0]
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid Password" })
        }

        //Generate Token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: process.env.JWT_EXPIRES_IN })
        // console.log(token);
        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000)
        })
        res.json({ message: "Login Successfully" })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}


export const getCurrentUser = async (req, res) => {
    try {
        const user_id = req.user.id
        const [users] = await db.query("SELECT id,first_name, last_name, email, phone, dob,profile_image FROM users WHERE id=?",
            [user_id])
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json(users[0])
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}

export const uploadProfileImage = async (req, res) => {
    try {
        const user_id = req.user.id;
        const profile_image = req.file ? `/upload/${req.file.filename}` : null;

        const [result] = await db.query("UPDATE users SET profile_image = ? WHERE id=?", [profile_image, user_id])
        //  console.log(result);
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" })
        }
        res.json({ message: "Profile image uploaded", profile_image })
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message })
    }
}




// -------------------- ⭐ NEW ADD-ON: LOGOUT --------------------
export const logout = (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out successfully" });
};

// -------------------- ⭐ NEW ADD-ON: UPDATE PROFILE --------------------
export const updateProfile = async (req, res) => {
    try {
        const user_id = req.user.id;
        const { first_name, last_name, phone, dob } = req.body;

        // Validations
        if (!first_name || !/^[A-Za-z]+$/.test(first_name)) {
            return res.status(400).json({ message: "First name must contain only letters" });
        }

        if (!last_name || !/^[A-Za-z]+$/.test(last_name)) {
            return res.status(400).json({ message: "Last name must contain only letters" });
        }

        if (!/^[0-9]{10}$/.test(phone)) {
            return res.status(400).json({ message: "Phone must be 10 digits" });
        }

        if (!dob || isNaN(new Date(dob).getTime())) {
            return res.status(400).json({ message: "Invalid date format" });
        }

        // Update DB using user_id (BEST PRACTICE)
        const [result] = await db.query(
            "UPDATE users SET first_name=?, last_name=?, phone=?, dob=? WHERE id=?",
            [first_name, last_name, phone, dob, user_id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ message: "Profile updated successfully" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

