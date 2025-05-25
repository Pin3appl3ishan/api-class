const User = require("../models/User");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const existingUser = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPas = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      firstName,
      lastName,
      password: hashedPas,
    });
    await newUser.save();
    res.status(201).json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    console.error("Error in register controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};


exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: "Missing fields",
    });
  }

  try {
    const getUser = await User.findOne({email: email});

    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  } catch (error) {
    console.error("Error in loginUser controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}