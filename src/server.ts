import express from "express";
import dotenv from 'dotenv'
import { connectDB } from "./config/db";
import contactRoutes from "./routes/contactRoutes";

dotenv.config()

connectDB()

const app = express()
app.use(express.json())

// Routes
app.use('/api/contacts', contactRoutes) 

export default app