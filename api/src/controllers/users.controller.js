import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { db } from '../config';
import { User } from '../models';

// TODO: convert all promises to ES8 async/await

/**
 * @private
 * @method GET
 * @access api/users
 * @description Get all users
 */
const list = (req, res, next) => {
  const query = 'SELECT* FROM users';
  db.query(query, (error, users) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ users });
  });
}

/**
 * @private
 * @method GET
 * @access api/users/:id
 * @param {number} req.params.id
 * @description Get a user by id
 */
const getById = (req, res, next) => {
  const id = req.params.id;
  const query = 'SELECT * FROM users WHERE user_id=?';
  db.query(query, [id], (error, user) => {
    if (error) return res.status(500).json({ error });
    return res.status(200).json({ user });
  });
}

export const userController = {
  list,
  getById
}
