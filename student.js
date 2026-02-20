// models/student.js
import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 16, // optional validation
    },
    department: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin'], // matches your checkRole middleware
      default: 'student',
    },
  },
  { timestamps: true }
);

const Student = mongoose.model('Student', studentSchema);

export default Student;

