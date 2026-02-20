// controllers/studentController.js
import Student from '../models/student.js';

// Middleware to check role
const checkRole = (requiredRole) => {
  return (req, res, next) => {
    if (req.user && req.user.role === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: 'Access denied' });
    }
  };
};

// CREATE - Add new student
export const createStudent = [
  checkRole('admin'),
  async (req, res) => {
    try {
      const student = new Student(req.body);
      await student.save();
      res.status(201).json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// READ - Get all students
export const getAllStudents = [
  checkRole('admin'),
  async (req, res) => {
    try {
      const students = await Student.find();
      res.json(students);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// READ - Get student by ID
export const getStudentById = [
  checkRole('admin'),
  async (req, res) => {
    try {
      const student = await Student.findById(req.params.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.json(student);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];

// UPDATE - Update student
export const updateStudent = [
  checkRole('admin'),
  async (req, res) => {
    try {
      const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.json(student);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  },
];

// DELETE - Delete student
export const deleteStudent = [
  checkRole('admin'),
  async (req, res) => {
    try {
      const student = await Student.findByIdAndDelete(req.params.id);
      if (!student) return res.status(404).json({ message: 'Student not found' });
      res.json({ message: 'Student deleted' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
];