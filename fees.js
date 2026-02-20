const mongoose = require('mongoose');
const feeschema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    amount: { type: Number, required: true },
    paid: { type: Boolean, default: false },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['paid', 'unpaid'], default: 'unpaid' },  
}, { timestamps: true });
module.exports = mongoose.model('Fee', feeschema);