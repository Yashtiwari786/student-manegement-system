const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { profile } = require('console');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['director', 'teacher','student'], required: true },
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    department: { type: String }, // Only for students
    profilePicture: { type: String }, // URL to profile picture
    lastLogin: { type: Date }, // To track last login time
}, { timestamps: true });
UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next(); 
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
