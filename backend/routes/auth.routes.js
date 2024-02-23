const router = require("express").Router();

const authController = require("../controllers/auth.controller");

//registrar usuário
router.post("/register", authController.register);

router.post("/login", authController.login);

module.exports = router;
