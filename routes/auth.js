/*
    Rutas de usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express');
const { check } = require('express-validator');

const { fieldsValidator } = require('../middlewares/fieldsValidator');
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { jwtValidator } = require('../middlewares/jwtValidator');

const router = Router();

router.post(
  '/new',
  [
    // Middlewares
    check('name', 'The name is required.').notEmpty(),
    check('email', 'The email is required.').isEmail(),
    check('password', 'The password must be at least 6 characters.').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  createUser
);

router.post(
  '/',
  [
    // Middlewares
    check('email', 'The email is required.').isEmail(),
    check('password', 'The password must be at least 6 characters.').isLength({
      min: 6,
    }),
    fieldsValidator,
  ],
  loginUser
);

router.get('/renew', jwtValidator, renewToken);

module.exports = router;
