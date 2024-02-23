const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../helpers/env");

const User = require("../models/user");

// pegar usuario pelo jwt token - pois o token contem info do usuario
const getUserByToken = async (token) => {
  if (!token) {
    return res.status(400).json({ error: "Acesso negado!" });
  }

  //econtrar usuario
  const decoded = jwt.verify(token, JWT_TOKEN);
  const userId = decoded.id;

  const user = await User.findOne({ _id: userId });

  return user;
};

module.exports = getUserByToken;
