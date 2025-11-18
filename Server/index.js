import express from "express"
import dotenv from "dotenv"
import { fileURLToPath } from "url";
import path from "path"
import authRoutes from "./Route/authRoute.js"
import cookieParser from "cookie-parser";
import cors from "cors";
dotenv.config()

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const app = express()
//Middleware
app.use(express.json())
app.use(cookieParser())

 

app.use(
  cors({
    origin: "http://localhost:5173",   // frontend URL
    credentials: true,                 // allow cookies to be sent
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Serve uploads directory (optional, if needed)
app.use("/upload", express.static(path.join(dirname, "uploads")));

app.use("/api/auth",authRoutes)



const PORT=process.env.PORT
app.listen(5000, () => {
    console.log(`Server is running on ${PORT}`);

})