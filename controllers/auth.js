const { response } = require("express");
const User = require("../models/User");

const registerUser = async (req, res = response) => {
  // const { name, email, password } = req.body;

  try {
    const user = new User(req.body);

    await user.save();

    res.status(201).json({
      ok: true,
      msg: "Register",
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
