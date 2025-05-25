const User = require("../../models/User");
const bcrypt = require("bcrypt");

// 5 common apis -> CREATE, READ, READ ALL, UPDATE, DELETE

exports.createUser = async (req, res) => {
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
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne(
      { _id: id } // findById(id);
    );

    return res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateUser = async (req, res) => {
  const { firstName, lastName } = req.body;
  const id = req.params.id;

  try {
    const user = await User.updateOne(
      { _id: id },
      {
        $set: {
          firstName,
          lastName,
        },
      }
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      //   data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const _id = req.params.id;
    const user = await User.deleteOne({ _id: _id });
    return res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
