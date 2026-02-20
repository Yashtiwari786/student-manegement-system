// server.js (ES Module style)

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
import authRoutes from './routes/authRoutes.js';
import directorRoutes from './routes/director.js';
import studentRoutes from './routes/student.js';
import teacherRoutes from './routes/teacher.js';
import classesRoutes from './routes/classes.js';
import attendanceRoutes from './routes/attendance.js';
import feesRoutes from './routes/fees.js';
import marksRoutes from './routes/marks.js';
import announcementsRoutes from './routes/announcements.js';


app.use('/api/auth', authRoutes);
app.use('/api/directors', directorRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/classes', classesRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/fees', feesRoutes);
app.use('/api/marks', marksRoutes);
app.use('/api/announcements', announcementsRoutes);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));