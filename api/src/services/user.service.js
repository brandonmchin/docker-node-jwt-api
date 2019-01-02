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

export const userService = {
  list,
  getById
}
