const router = require("express").Router(); //Router is middleware of express
const multer = require("multer");
const authorize = require("../../helpers/middlewares/authorize");
const path = require("path");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const {
  createUser,
  updateUser,
  deleteUser,
  fetchAllUser,
  fetchOneUser,
} = require("../controllers/user.controller");
router.post("/", createUser); //!createuser
router.put("/:id", authorize("manager"), updateUser); //!updateuser
router.delete("/:id", authorize("manager"), deleteUser);
router.get("/:id", authorize("manager", "users"), fetchOneUser);
router.get("/", authorize("manager"), fetchAllUser);

module.exports = router;
