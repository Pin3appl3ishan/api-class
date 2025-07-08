const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
    {
        stu_id: {
            type: Number,
            required: true,
            unique: true,
        },
        stu_email: {
            type: String,
            required: true,
            unique: true,
        },
        stu_name: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
    }
)

exports.Student = mongoose.model("Student", StudentSchema);