export const errorHandler = (error, req, res, next) => {
  if (typeof (error) === 'string') {
    res.status(400).json({ message: error });
  }

  else if (error.status) {
    res.status(error.status).json({ message: error.message });
  }

  else {
    res.status(500).json({ message: error.message });  // default 500 server error
  }

  next();
}
