import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  subscribe: {
    type: Boolean,
    default: false,
  },
  paymentId: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
