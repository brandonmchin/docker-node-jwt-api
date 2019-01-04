import joi from 'joi';

import { validationSchemas } from '../config';

const buildErrorObject =  (errors) => {
  let errorObject = {};
  errors.details.map((error) => {
    if (!errorObject.hasOwnProperty(error.path.join('_'))) {
      errorObject[error.path.join('_')] = {
        message: error.message
      }
    }
  });
  return errorObject;
}

export const validate = (req, res, next) => {
  const options = {
    abortEarly: false,  // abort after the first validation error
    allowUnknown: true,  // allow unknown keys that will be ignored
    stripUnknown: true  // remove unknown keys from the validated data
  };

  const route = req.route.path;

  if (validationSchemas.hasOwnProperty(route)) {
    const schema = validationSchemas[route];
    joi.validate(req.body, schema, options, (error) => {
      if (error) {
        next({ status: 422, message: buildErrorObject(error) });
      }
    });
  }

  next();
}