const User = require("../../models/User");
const bcrypt = require("bcrypt");

// 5 common apis -> CREATE, READ, READ ALL, UPDATE, DELETE

exports.createUser = async (req, res) => {
  const { username, email, firstName, lastName, password } = req.body;
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

exports.getOneUser = async (req, res) => {
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

exports.deleteOne = async (req, res) => {
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
