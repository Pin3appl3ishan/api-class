const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getOne,
  updateUser,
  deleteUser,
} = require("../../controllers/admin/usermanagement");

const { authorizedUser } = require("../../middlewares/authorizedUser");
const { isAdmin } = require("../../middlewares/authorizedUser");

const upload = require('../../middlewares/fileupload');

router.post("/", upload.single("image"), createUser);
router.get("/", authorizedUser, isAdmin, getAllUsers);
router.get("/:id", getOne);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
