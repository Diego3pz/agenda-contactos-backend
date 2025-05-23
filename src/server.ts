import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import { corsConfig } from "./config/cors";
import { connectDB } from "./config/db";
import contactRoutes from "./routes/contactRoutes";
import authRoutes from "./routes/authRoutes";
import morgan from "morgan";

dotenv.config()

connectDB()

const app = express()
app.use(cors(corsConfig))

// Loggin
app.use(morgan('dev'))

// Leer datos del formulario
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/contacts', contactRoutes)

export default app