// middleware/authMiddleware.js (ES Module style)

import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import Teacher from '../models/teacher.js';
import Student from '../models/student.js';
import Director from '../models/director.js';

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JwtSecret);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: 'User not found, authorization denied' });
    }

    req.user = user;

    if (user.role === 'teacher') {
      const teacher = await Teacher.findOne({ user: user._id });
      req.teacher = teacher;
    } else if (user.role === 'student') {
      const student = await Student.findOne({ user: user._id });
      req.student = student;
    } else if (user.role === 'director') {
      const director = await Director.findOne({ user: user._id });
      req.director = director;
    }

    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

export default authMiddleware;