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
    // next(error);
    return res.status(500).json({ error });
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
    // next(error);
    return res.status(500).json({ error });
  });
});

export default router;

/////////////////////////////////////////////////////////////////////////////

// @route   POST api/users/register
// @desc    Create (register) a new user
// router.post('/register', (req, res, next) => {
//   userService.register(req.body)
//   .then((result) => {
//     return res.status(200).json(result);
//   })
//   .catch((error) => {
//     next(error);
//   });
// });

// @route   POST api/users/signin
// @desc    Authenticate user
// router.post('/signin', (req, res, next) => {
//   userService.login(req.body)
//   .then((result) => {
//     return res.status(200).json(result);
//   })
//   .catch((error) => {
//     next(error);
//   });
// });

// module.exports = { 
//   users: router 
// };
