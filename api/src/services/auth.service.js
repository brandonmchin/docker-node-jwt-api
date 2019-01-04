import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import { db } from '../config';

const register = (user) => {
  return new Promise((resolve, reject) => {
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
  });
}

const login = (user) => {
  return new Promise((resolve, reject) => {
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
  });
}

export const authService = {
  register,
  login
}
