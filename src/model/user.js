import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const userSchema = new mongoose.Schema({
  uuid: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  money_balance: { type: Number },
  bought_tickets: [String],
});

const User = mongoose.model("User", userSchema);

export default User;
