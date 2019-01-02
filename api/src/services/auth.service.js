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
      else if (key === 'passwordMatch' && !validator.equals(fields[key], fields['password'])) {
        reject({
          [key]: 'Passwords must match'
        });
      }
    });
    resolve();
  });
}

const register = (user) => {
  return new Promise((resolve, reject) => {
    // check if fields are valid
    validate(user)
    .then(() => {
      // check if email or username already exist
      const query = 'SELECT * FROM users WHERE email=? OR username=?';
      db.query(query, [user.email, user.username], (error, users) => {
        if (error) reject(error);
        else if (users && users.length > 0) {
          if (user.email === users[0].email) {
            reject({ status: 409, message: 'Email already exists' });
          }
          else {
            reject({ status: 409, message: 'Username already exists' });
          }
        }
        else {
          // create user
          const saltRounds = 10;
          bcrypt.hash(user.password, saltRounds)
          .then((hash) => {
            const query = 'INSERT INTO users (email, username, password) VALUES (?,?,?)';
            db.query(query, [user.email, user.username, hash], (error, result) => {
              if (error) reject(error);
              resolve(result);
            });
          })
          .catch((error) => {
            reject(error);
          });
        }
      });
    })
    .catch((error) => {
      reject({ status: 422, message: error });
    });
  });
}

const login = (user) => {
  return new Promise((resolve, reject) => {
    // check if fields are valid
    validate(user)
    .then(() => {
      // check if username exists
      const query = 'SELECT * FROM users WHERE username=?';
      db.query(query, [user.username], (error, users) => {
        if (error) reject(error);
        else if (!users || users.length === 0) {
          reject({ status: 401, message: 'Incorrect login credentials' });
        }
        else {
          // check if password is correct
          const userdata = JSON.parse(JSON.stringify(users[0]));
          bcrypt.compare(user.password, userdata.password)
          .then((isMatch) => {
            if (isMatch) {
              const token = jwt.sign({ userid: user.user_id, username: user.username }, process.env.JWT_KEY, {
                expiresIn: 600  // 10 minutes
              });
              resolve({ token });
            }
            else {
              reject({ status: 401, message: 'Incorrect login credentials' });
            }
          })
          .catch((error) => {
            reject(error);
          });
        }
      });
    })
    .catch((error) => {
      reject({ status: 422, message: error });
    })
  });
}

export const authService = {
  register,
  login
}
