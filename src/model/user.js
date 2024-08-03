import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uuid: { type: String, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  money_balance: { type: Number, required: true },
});

const User = mongoose.model("User", userSchema);
export default User;
