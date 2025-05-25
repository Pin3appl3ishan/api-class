const Student = require("../models/Student");
const bcrypt = require("bcrypt");

exports.create = async (req, res) => {
  const { stu_id, stu_email, stu_name, password } = req.body;
  if (!stu_id || !stu_email || !stu_name) {
    return res.status(400).json({
      success: false,
      message: "Please fill all the fields",
    });
  }

  try {
    const existingStudent = await Student.findOne({
      $or: [{ stu_id: stu_id }, { stu_email: stu_email }],
    });

    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: "Student already exists",
      });
    }

    const hashedPas = await bcrypt.hash(stu_id.toString(), 10);
    const newStudent = await Student.create({
      stu_id,
      stu_email,
      stu_name,
      password: hashedPas,
    });
  } catch (error) {
    console.error("Error in create controller:", error);
  }
};
