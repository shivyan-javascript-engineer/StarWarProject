const authService = require('../services/auth.service');
const httpService = require('../services/http.service');
const { API_URL } = require('../../config/').constants;
const hasKeysValues = require('../../utils/hasKeysValues');

const UserController = () => {
  const login = async (req, res) => {
    const { username, password } = req.body;

    if (username && password) {
      try {
        const loadedHttpService = httpService(API_URL);
        const users = (await loadedHttpService.get('people/')).results;
        if (hasKeysValues(users, ['name', 'birth_year'], [username, password])) {
          const token = authService().issue({
            name: username
          });

          return res.status(200).json({ token });
        }
        return res.status(400).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request: Email or password is wrong' });
  };

  const validate = (req, res) => {
    const { token } = req.body;

    authService().verify(token, err => {
      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Invalid Token!' });
      }

      return res.status(200).json({ isvalid: true });
    });
  };

  return {
    login,
    validate
  };
};

module.exports = UserController;
