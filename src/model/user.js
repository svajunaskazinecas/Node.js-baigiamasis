import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  money_balance: { type: Number, default: 0.0 },
});

export default mongoose.model("User", userSchema);
