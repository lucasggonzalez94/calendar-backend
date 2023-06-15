const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { registerUser, loginUser, refreshToken } = require('../controllers/auth');
const validateProps = require('../middlewares/validateProps');

// /api/auth
router.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validateProps
  ],
  loginUser
);

router.post(
  '/register',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe tener mínimo 6 caracteres').isLength({ min: 6 }),
    validateProps
  ],
  registerUser
);

router.get('/refresh', refreshToken);

module.exports = router;