import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: string,
    required: true,
    uniqe: true
  },
  email: {
    type: string,
    required: true,
    uniqe: true
  },
  password: {
    type: string,
    required: true,
  },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User
