const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
    {
        courseCode: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        courseName: {
            type: String,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            trim: true,
        },
        semester: {
            type: Number,
            required: true,
            min: 1,
            max: 8,
        },
        program: {
            type: String,
            required: true,
            enum: ['BCA', 'BTech', 'BSc', 'BA'],
        },
        credits: {
            type: Number,
            required: true,
            min: 1,
        },
        instructor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Teacher',
            required: true,
        },
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student',
            },
        ],
        status: {
            type: String,
            enum: ['active', 'inactive'],
            default: 'active',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Course', courseSchema);