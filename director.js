// models/director.js (ES Module style)

import mongoose from 'mongoose';

const directorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
  },
  { timestamps: true }
);

const Director = mongoose.model('Director', directorSchema);

export default Director;       
