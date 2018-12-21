import { Router } from 'express';

import { userController } from '../controllers';
import { authenticate } from '../middleware';

const users = Router();

users.get('/', authenticate(), userController.list);
users.get('/:id', authenticate(), userController.getById);

export default users;

/////////////////////////////////////////////////////////////////////////////

// const { userService } = require('../services');
// const { verifyAuth } = require('../middleware');

// @route   GET api/users
// @desc    Get all users
// router.get('/', (req, res, next) => {
//   userService.getAll()
//   .then((users) => {
//     return res.status(200).json(users);
//   })
//   .catch((error) => {
//     next(error);
//   });
// });

// @route   GET api/users/authenticate
// @desc    Access authorized page with valid json web token
// router.get('/authenticate', verifyAuth, (req, res) => {
//   console.log('USER AUTHENTICATED:', req.userdata);
//   return res.status(200).send('User is authenticated');
// });

// @route   GET api/users/:id
// @desc    Get user with id
// router.get('/:id', (req, res, next) => {
//   userService.getById(req.params.id)
//   .then((user) => {
//     return res.status(200).json(user);
//   })
//   .catch((error) => {
//     next(error);
//   });
// });

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
