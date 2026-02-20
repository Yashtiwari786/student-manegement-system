const mongoose = require('mongoose');
const timetableSchema = new mongoose.Schema({
    class: { type: mongoose.Schema.Types.ObjectId, ref: 'Classes', required: true },
    day: { type: String, enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'], required: true },
    periods: [{ 
        periodNumber: { type: Number, required: true },
        subject: { type: String, required: true },
        teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher', required: true },
    }],
}, { timestamps: true });
module.exports = mongoose.model('Timetable', timetableSchema);
