const Joi = require('joi');

module.exports = {
  // user login validation
  userLoginSchema: Joi.object().keys({
    username: Joi.string()
      .trim()
      .required()
      .error(new Error('Username is invalid or empty.')),
    password: Joi.string()
      .trim()
      .required()
      .error(new Error('Password is invalid or empty.'))
  }),

  // user token validation
  userTokenSchema: Joi.object().keys({
    token: Joi.string()
      .trim()
      .required()
      .error(new Error('Token is invalid or empty.'))
  }),

  // planet search schema
  planetSearchSchema: Joi.object().keys({
    name: Joi.string()
      .trim()
      .required()
      .error(new Error('Name query string is invalid or empty.'))
  })
};
