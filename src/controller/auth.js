import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import { v4 as uuidv4 } from "uuid";
import dotenv from "dotenv";

dotenv.config();

export const signUp = async (req, res) => {
  const { name, email, password } = req.body;

  if (!email.includes("@") || password.length < 6 || !/\d/.test(password)) {
    return res.status(400).json({ message: "Validation failed" });
  }

  const capFirstName = name.charAt(0).toUpperCase() + name.slice(1);
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      id: uuidv4(),
      name: capFirstName,
      email,
      password: hashedPassword,
      money_balance: req.body.money_balance,
    });

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Registration successful",
      jwt_token: token,
      jwt_refresh_token: refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Auth failed" });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      message: "Login successful",
      jwt_token: token,
      jwt_refresh_token: refreshToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

export const getNewJwtToken = (req, res) => {
  const { jwt_refresh_token } = req.body;

  try {
    const decoded = jwt.verify(
      jwt_refresh_token,
      process.env.JWT_REFRESH_SECRET
    );

    const newToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );
    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      jwt_token: newToken,
      jwt_refresh_token: newRefreshToken,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: "Please log in again" });
  }
};
