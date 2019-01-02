import { Router } from 'express';

import { authService } from '../services';

const router = Router();

/**
 * @public
 * @method POST
 * @access api/auth/register
 * @param {string} req.body.email
 * @param {string} req.body.username
 * @param {string} req.body.password
 * @param {string} req.body.passwordMatch
 * @description Create a new user if they don't already exist
 */
router.post('/register', (req, res, next) => {
  const { email, username, password, passwordMatch } = req.body;
  authService.register({ email, username, password, passwordMatch })
  .then(() => {
    return res.send('User successfully created');
  })
  .catch((error) => {
    next(error);
  });
});

/**
 * @public
 * @method POST
 * @access api/auth/login
 * @param {string} req.body.username
 * @param {string} req.body.password
 * @description: Authenticate user and generate a new JSON web token
 */
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  authService.login({ username, password })
  .then((result) => {
    return res.json({ result });
  })
  .catch((error) => {
    next(error);
  });
});

export default router;
