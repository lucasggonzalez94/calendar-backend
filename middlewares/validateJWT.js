const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (req, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: 'Token inexistente'
    });
  };

  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);

    req.uid = payload.uid;
    req.name = payload.name;
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: 'Token inválido'
    });
  };

  next();
};

module.exports = validateJWT;