import bcrypt from 'bcrypt';

import { db } from '../config';

const list = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users';
    db.query(query, (error, users) => {
      if (error) reject(error);
      resolve(users);
    });
  });
}

const getById = (id) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE user_id=?';
    db.query(query, [id], (error, user) => {
      if (error) reject(error);
      resolve(user);
    });
  });
}

const create = (user) => {
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

export const userService = {
  list,
  getById,
  create
}
