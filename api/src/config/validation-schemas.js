import joi from 'joi';

const registerDataSchema = joi.object().keys({
  email: joi.string().email({ minDomainAtoms: 2 }).required(),  // must have two domain parts (e.g. example.com)
  username: joi.string().alphanum().required(),
  password: joi.string().required(),
  passwordMatch: joi.string().valid(joi.ref('password')).required().strict()
});

const loginDataSchema = joi.object().keys({
  username: joi.string().required(),
  password: joi.string().required()
});

export const validationSchemas = {
  '/register': registerDataSchema,
  '/login': loginDataSchema
}
