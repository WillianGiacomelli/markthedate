const jwt = require("jsonwebtoken");

// middleware para validar token
const checkToken = (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res.status(400).json({ error: "Acesso negado! Token" });
  }

  try {
    const verified = jwt.verify(token, "nossosecret");
    req.user = verified;
    next(); //continua o fluxo padrão
  } catch (error) {
    res.status(400).json({ error: "Token inválido!" });
  }
};

module.exports = checkToken;
