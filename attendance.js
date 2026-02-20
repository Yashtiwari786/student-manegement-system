const mongoose = require('mongoose');
const { markAsUncloneable } = require('worker_threads');
const attendanceSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    Date: { type: Date, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Class', required: true },
    status: { type: String, enum: ['present', 'absent'], required: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
}, { timestamps: true });
module.exports = mongoose.model('Attendance', attendanceSchema);