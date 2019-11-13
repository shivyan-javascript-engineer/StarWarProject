const httpService = require('../services/http.service');
const { API_URL } = require('../../config/').constants;
const searchValue = require('../../utils/searchValue');

const PlanetController = () => {
  const searchPlanet = async (req, res) => {
    const { name } = req.query;

    try {
      const loadedHttpService = httpService(API_URL);
      const planets = (await loadedHttpService.get('planets/')).results;

      const searchedResults = searchValue(planets, name, 'name');

      return res.status(200).json({
        status: true,
        data: searchedResults
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  const getPlanet = async (req, res) => {
    const { name: planetName } = req.params;

    try {
      const loadedHttpService = httpService(API_URL);
      const planets = (await loadedHttpService.get('planets/')).results;
      const planet = planets.find(obj => obj.name === planetName);
      if (planet)
        return res.status(200).json({
          status: true,
          data: planet
        });

      return res.status(400).json({
        status: false
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    searchPlanet,
    getPlanet
  };
};

module.exports = PlanetController;
