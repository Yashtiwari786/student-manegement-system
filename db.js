const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user.js'); // adjust path if needed

dotenv.config();

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

// Register new user
const registerUser = async (userData) => {
  try {
    const user = new User(userData);
    await user.save();
    console.log('User registered successfully:', user);
    return user;
  } catch (err) {
    console.error('Error registering user:', err.message);
    throw err;
  }
};

// Login user
const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new Error('User not found');

    if (user.password !== password) throw new Error('Invalid credentials');
    console.log('Login successful:', user);
    return user;
  } catch (err) {
    console.error('Error logging in:', err.message);
    throw err;
  }
};

module.exports = { connectDB, registerUser, loginUser };
