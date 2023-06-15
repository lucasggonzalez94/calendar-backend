const { response } = require("express");
const bcrypt = require('bcryptjs');

const User = require("../models/User");

const registerUser = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        ok: false,
        msg: 'El usuario ya existe'
      })
    }

    user = new User(req.body);

    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    res.status(201).json({
      ok: true,
      uid: user._id,
      name: user.name
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Por favor hable con el administrador'
    });
  }
};

const loginUser = (req, res = response) => {
  const { email, password } = req.body;

  res.json({
    ok: true,
    msg: "Login",
    email,
    password,
  });
};

const refreshToken = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Refresh",
  });
};

module.exports = {
  registerUser,
  loginUser,
  refreshToken,
};
