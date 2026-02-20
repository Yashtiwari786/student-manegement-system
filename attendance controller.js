const Attendance = require('../models/attendance');

exports.getAttendance = async (req, res) => {
  const { date, classId, studentId } = req.query;
  let filter = {};
  if (date) filter.date = new Date(date);
  const Student = require('../../models/student');
  if (classId) filter.student = { $in: await Student.find({ class: classId }).select('_id') };
  if (studentId) filter.student = studentId;
  try {
    const attendance = await Attendance.find(filter).populate('student');
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.markAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;
  try {
    let attendance = await Attendance.findOne({ student: studentId, date: new Date(date) });
    if (attendance) {
      attendance.status = status;
    } else {
      attendance = new Attendance({ student: studentId, date: new Date(date), status, markedBy: req.user.id });
    }
    await attendance.save();
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Add similar for update/delete
exports.updateAttendance = async (req, res) => {
  const { studentId, date, status } = req.body;
  try {
    const attendance = await Attendance.findOneAndUpdate(
      { student: studentId, date: new Date(date) },
      { status },
      { new: true }
    );
    if (!attendance) return res.status(404).json({ msg: 'Attendance not found' });
    res.json(attendance);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.deleteAttendance = async (req, res) => {
  const { studentId, date } = req.body;
  try {
    const attendance = await Attendance.findOneAndDelete({ student: studentId, date: new Date(date) });
    if (!attendance) return res.status(404).json({ msg: 'Attendance not found' });
    res.json({ msg: 'Attendance deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};