const validations = require('../../api/policies/validations.policy');
const validationsSchema = require('../../api/validations/request.validations');

const publicRoutes = {
  'POST /users/login': {
    path: 'UserController.login',
    middlewares: [validations().validateBody(validationsSchema.userLoginSchema)]
  },
  'POST /users/validate': {
    path: 'UserController.validate',
    middlewares: [validations().validateBody(validationsSchema.userTokenSchema)]
  }
};

module.exports = publicRoutes;
