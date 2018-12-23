import { Router } from 'express';

import { authService } from '../services';

const router = Router();

/**
 * @private
 * @method POST
 * @access api/auth/login
 * @param {string} req.body.username
 * @param {string} req.body.password
 * @description: Authenticate user and generate a new JSON web token
 */
router.post('/login', (req, res, next) => {
  const { username, password } = req.body;
  authService.login(username, password)
  .then(() => {
    return;
  })
  .catch((error) => {
    next(error);
  });
});

export default router;
