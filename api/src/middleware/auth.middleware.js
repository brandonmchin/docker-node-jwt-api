import jwt from 'jsonwebtoken';

export const authenticate = (req, res, next) => {
  try {
    const token = req.headers['authorization'].split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userdata = decoded;
    next();
  }
  catch (error) {
    console.log(error);
    return res.status(401).send('Authorization token error');
  }
}
