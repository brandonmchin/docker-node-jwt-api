import { Router } from 'express';

import { authenticate } from '../middleware';
import { userService } from '../services';

const router = Router();

/**
 * @private
 * @method GET
 * @access api/users
 * @description: Get all users
 */
router.get('/', authenticate, (req, res, next) => {
  userService.list()
  .then((users) => {
    return res.json({ users });
  })
  .catch((error) => {
    next(error);
  });
});

/**
 * @private
 * @method GET
 * @access api/users/:id
 * @param {number} req.params.id
 * @description: Get a user by id
 */
router.get('/:id', authenticate, (req, res, next) => {
  const id = req.params.id;
  userService.getById(id)
  .then((user) => {
    return res.json({ user });
  })
  .catch((error) => {
    next(error);
  });
});

export default router;
