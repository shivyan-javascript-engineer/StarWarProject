const Request = require('../models/RequestModel');
const httpService = require('../services/http.service');
const { API_URL } = require('../../config/').constants;
const searchValue = require('../../utils/searchValue');

const PlanetController = () => {
  const searchPlanet = async (req, res) => {
    const { name } = req.query;

    try {
      // check that only specific user can make more than 50 request in a minute
      if (req.token.name !== 'Luke Skywalker') {
        const request = await Request.find(
          { requestBy: req.token.name, route: req.url },
          { date: 1, _id: 0 }
        )
          .sort({ date: -1 })
          .skip(49)
          .limit(1);

        if (request.length) {
          const currentTime = new Date().getTime();
          if (currentTime - request[0].date.getTime() < 60000) {
            return res
              .status(400)
              .json({ msg: "You can't make more than 50 search in a minute. Please wait." });
          }
        }
      }

      let requestData = new Request({
        requestBy: req.token.name,
        route: req.url
      });

      await requestData.save();

      const loadedHttpService = httpService(API_URL);
      const planets = (await loadedHttpService.get('planets/')).results;

      const searchedResults = searchValue(planets, name, ['name', 'diameter']);

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
