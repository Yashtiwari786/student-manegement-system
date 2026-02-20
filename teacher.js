// models/teacher.js
const mongoose = require('mongoose');

const TeacherSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    classes: [
      {
        type: String,
      },
    ],
    // You can embed related data if needed
    grades: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        grade: String,
      },
    ],
    attendance: [
      {
        student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
        date: Date,
        status: { type: String, enum: ['Present', 'Absent'] },
      },
    ],
    materials: [
      {
        title: String,
        url: String,
      },
    ],
    syllabus: {
      topics: [String],
      updatedAt: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', TeacherSchema);
