const Joi = require('joi');

const validations = () => {
  const validateBody = schema => (req, res, next) => {
    const result = Joi.validate(req.body, schema);
    if (result.error) {
      return res.status(400).json({ status: false, message: result.error.message });
    }
    return next();
  };

  const validateQuery = schema => (req, res, next) => {
    const result = Joi.validate(req.query, schema);
    if (result.error) {
      return res.status(400).json({ status: false, message: result.error.message });
    }
    return next();
  };

  return {
    validateBody,
    validateQuery
  };
};

module.exports = validations;
