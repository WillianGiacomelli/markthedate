const router = require("express").Router();

//middlewares
const verifyToken = require("../helpers/check-token");

const userController = require("../controllers/user.controller");

router.get("/:id", verifyToken, userController.getUserById);

//atualizar usuario
router.put("/", verifyToken, userController.updateUser);

module.exports = router;
