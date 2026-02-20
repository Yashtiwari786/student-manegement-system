const User = require('../models/user');
const Student = require('../models/student');
const Teacher = require('../models/teacher');
const Director = require('../models/director');
const jwt = require('jsonwebtoken');
exports.register = async (req, res) => {
  const { username, password, role, fullName, email, phone, additionalData } = req.body;
  try {
    let user = await User.findOne({ username });
    if (user) return res.status(400).json({ msg: 'User exists' });

    user = new User({ username, password, role, fullName, email, phone });
    await user.save();

    if (role === 'student') {
      const student = new Student({ user: user._id, ...additionalData });
      await student.save();
    } else if (role === 'teacher') {
      const teacher = new Teacher({ user: user._id, ...additionalData });
      await teacher.save();
    } else if (role === 'director') {
      const director = new Director({ user: user._id, ...additionalData });
      await director.save();
    }

    const payload = { id: user._id, role: user.role, fullName: user.fullname, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user || !(await user.matchPassword(password))) return res.status(400).json({ msg: 'Invalid credentials' });

    user.lastLogin = new Date();
    await user.save();

    const payload = { id: user._id, role: user.role, fullName: user.fullName, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};