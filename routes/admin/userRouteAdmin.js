const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getOne,
  updateUser,
  deleteUser,
} = require("../../controllers/admin/usermanagement");

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:id", getOne);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
