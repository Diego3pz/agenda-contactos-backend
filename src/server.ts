import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import contactRoutes from "./routes/contactRoutes";

dotenv.config()

connectDB()

const app = express()
app.use(cors(corsConfig))
app.use(express.json())

// Routes
app.use('/api/contacts', contactRoutes)

export default app