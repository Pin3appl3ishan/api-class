const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

exports.registerUser = async (req, res) => {
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
    const getUser = await User.findOne({ username: username });

    if (!getUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, getUser.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password",
      });
    }

    const payload = {
      _id: getUser._id,
      email: getUser.email,
      username: getUser.username,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: getUser,
      token: token,
    });
  } catch (error) {
    console.error("Error in loginUser controller:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const transpoter = nodemailer.createTransport(
    {
        service: "gmail",
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    }
)

exports.sendResetLink = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });
    const resetUrl = process.env.CLIENT_URL + "/reset-password/" + token;
    const mailOptions = {
      from: `"Your app" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset you password",
      html: `<p>Click on the link to reset</p>`,
    };
    transpoter.sendMail(mailOptions, (err, info) => {
      if (err)
        return res
          .status(403)
          .json({ success: false, message: "Email failed" });
      console.log(info);
      return res.status(200).json({ success: true, message: "Emali sent" });
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: "server error" });
  }
};

exports.resetPassword = async (req,res) => {
  const {token} = req.params;
  const {password} = req.body
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const hashed = await bcrypt.hash(password, 10)
    await User.findByIdAndUpdate(decoded.id, {password: hashed})
    return res.status(200).json({success: true, message: "Password updated"})
  } catch (err) {
    return res.status(500).json({success: false, message: "Server err/Invalid token"})
  }
}