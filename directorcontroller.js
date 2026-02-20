const Director = require('../models/director');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const classes = require('../models/classes');
const Course = require('../models/courses');

// Director Controller - Full access and control
exports.getDirectors = async (req, res) => {
  const directors = await Director.find();
  res.status(200).json(directors);
};

exports.createDirector = async (req, res) => {
  try {
    const director = new Director(req.body);
    await director.save();
    res.status(201).json({ message: 'Director created', director });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all students
exports.getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all teachers
exports.getAllTeachers = async (req, res) => {
    try {
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
exports.getAllClasses = async (req, res) => {
    try {
        const classesList = await classes.find();
        res.status(200).json(classesList);
        } catch (error) {   
                res.status(500).json({ message: error.message });
        }
};

// Add new student
exports.addStudent = async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json({ message: 'Student added', student });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Add new teacher
exports.addTeacher = async (req, res) => {
    try {
        const teacher = new Teacher(req.body);
        await teacher.save();
        res.status(201).json({ message: 'Teacher added', teacher });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Update student
exports.updateStudent = async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({ message: 'Student updated', student });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete student
exports.deleteStudent = async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Student deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get dashboard statistics
exports.getDashboard = async (req, res) => {
    try {
        const totalStudents = await Student.countDocuments();
        const totalTeachers = await Teacher.countDocuments();
        const totalCourses = await Course.countDocuments();
        
        res.status(200).json({ totalStudents, totalTeachers, totalCourses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};