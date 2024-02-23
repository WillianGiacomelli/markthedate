const bcrypt = require("bcrypt");

const User = require("../models/user");

//middlewares
const verifyToken = require("../helpers/check-token");

//helper
const getUserByToken = require("../helpers/get-user-by-token");

const getUserById = async (req, res) => {
  const id = req.params.id;

  try {
    //verificar usuário
    const user = await User.findOne({ _id: id }, { password: 0 });
    res.status(200).json({ error: null, user });
  } catch (error) {
    return res.status(400).json({ error: "O usuário não existe" });
  }
};

const updateUser = async (req, res) => {
  const token = req.header("auth-token");
  const user = await getUserByToken(token);
  const userReqId = req.body.id;
  const password = req.body.password;
  const confirmpassword = req.body.confirmpassword;

  const userId = user._id.toString();

  // checar se id do usuario é igual ao id passado
  if (userId != userReqId) {
    return res.status(400).json({ error: "Acesso negado!" });
  }

  const updateData = {
    name: req.body.name,
    email: req.body.email,
  };

  //checar se senhas batem
  if (password != confirmpassword) {
    return res.status(400).json({ error: "Senhas difentes!" });
    //se a senha for passada para alteração
  } else if (password == confirmpassword && password != null) {
    //criar senha
    const salt = await bcrypt.genSalt(12);
    const passwordHashed = await bcrypt.hash(password, salt);

    updateData.password = passwordHashed;
  }

  try {
    //return dado atualizado
    const updatedUser = await User.findOneAndUpdate(
      { _id: userId },
      { $set: updateData },
      { new: true }
    );
    res.json({
      error: null,
      msg: "Usuário atualizado com sucesso",
      data: updatedUser,
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

module.exports = { getUserById, updateUser };
