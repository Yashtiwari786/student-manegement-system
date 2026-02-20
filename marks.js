const mongoose = require('mongoose');
const markSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    subject: { type: String, required: true },  
    marks: { type: Number, required: true },
    examtype: { type: String, enum: ['midsem', 'semester'], required: true },
    markedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    term: { type: String, enum: ['1', '2', '3'], required: true },
    teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    percentage: { type: Number, required: true },
    marksObtained: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    cgpa: { type: Number, required: true },
}, { timestamps: true });
module.exports = mongoose.model('Mark', markSchema);