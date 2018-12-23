import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { db } from '../config';

/**
 * @param {object} fields
 * @description: Validate request fields 
 */
const validate = (fields) => {
  return new Promise((resolve, reject) => {
    Object.key(fields).forEach((key) => {
      if (validator.isEmpty(fields[key])) {
        reject({
          [key]: 'This field is required'
        });
      }
      else if (key === 'email' && !validator.isEmail(fields[key])) {
        reject({
          [key]: 'Email must be valid'
        });
      }
    });
    resolve();
  });
}

const login = () => {

}

const register = () => {

}

export const authService = {
  login,
  register
}
