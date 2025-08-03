const bcrypt = require("bcrypt");
const User = require("../models/UserModels");
const generateToken = require("../lib/Ulits");

const signUp = async (req, res) => {
  console.log(req.body);
  const { name, email, password, role } = req.body;
  console.log("SignUp request received:", { name, email, password, role });

  try {
    if (!name || !email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }
    const UserExists = await User.findOne({ email });
    if (UserExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
    });
    console.log(newUser)
    if (newUser) {
      generateToken(newUser._id, res);
      console.log("New user created:", newUser);
      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        password: newUser.password,
      });
    } else {
      res.status(400).json({ message: "Invalid user" });
    }
  } catch (error) {
    console.error("Error in sign up controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Login = async (req, res) => {
  const { email, password } = req.body;
  console.log("Login request received:", { email, password });
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please provide email and password" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid || user.length === 0) {
      return res.status(400).json({ message: "Invalid password" });
    }
    generateToken(user._id, res);
    console.log("New user created:", user);

    res.status(201).json({
      _id: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const checkAuth = (req, res) => {
  try {
    // console.log(User.req.params);
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { signUp, Login, checkAuth };
