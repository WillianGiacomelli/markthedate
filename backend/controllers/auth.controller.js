const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_TOKEN } = require("../helpers/env");

const User = require("../models/user");

const register = async (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  //checar campos requeridos
  if (
    name == null ||
    email == null ||
    password == null ||
    confirmpassword == null
  ) {
    return res.status(400).json({ error: "Preencha todos os campos" });
  }

  //checar senhas
  if (password != confirmpassword) {
    return res.status(400).json({ error: "Senhas diferentes" });
  }

  // checar se email existe
  const emailExists = await User.findOne({ email: email });
  if (emailExists) {
    return res.status(400).json({ error: "Email já cadastrado" });
  }

  //criar senha
  const salt = await bcrypt.genSalt(12);
  const passwordHashed = await bcrypt.hash(password, salt);

  const user = new User({
    name: name,
    email: email,
    password: passwordHashed,
  });

  try {
    const newUser = await user.save();

    //criar token
    const token = jwt.sign(
      //payload
      {
        name: newUser.name,
        id: newUser._id,
      },
      JWT_TOKEN
    );

    // retornar token
    res.json({
      error: null,
      msg: "Você realizou o cadastro com sucesso",
      token: token,
      userId: newUser._id,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

const login = async (req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  // Verificar se o usuário está cadastrado
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(400).json({ error: "Email não cadastrado" });
  }

  //Verificar se a senha é igual
  const checkPassword = await bcrypt.compare(password, user.password);

  if (!checkPassword) {
    return res.status(400).json({ error: "A senha está errada" });
  }

  //criar token
  const token = jwt.sign(
    //payload
    {
      name: user.name,
      id: user._id,
    },
    JWT_TOKEN,
    {
      expiresIn: "1h",
    }
  );

  // retornar token
  res.status(200).json({
    error: null,
    msg: "Você realizou o login com sucesso",
    token: token,
    userId: user._id,
  });
};

module.exports = { register, login };
