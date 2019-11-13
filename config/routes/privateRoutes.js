const validations = require('../../api/policies/validations.policy');
const validationsSchema = require('../../api/validations/request.validations');

const privateRoutes = {
  'GET /planets/search': {
    path: 'PlanetController.searchPlanet',
    middlewares: [validations().validateQuery(validationsSchema.planetSearchSchema)]
  },
  'GET /planets/:name/item': 'PlanetController.getPlanet'
};

module.exports = privateRoutes;
