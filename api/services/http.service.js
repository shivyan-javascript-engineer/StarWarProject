const axios = require('axios');

const httpService = url => {
  const get = async slug => {
    try {
      console.log(`${url}/${slug}`);
      const result = await axios.get(`${url}/${slug}`);
      return Promise.resolve(result.data);
    } catch (err) {
      return Promise.reject(err.response);
    }
  };

  return {
    get
  };
};

module.exports = httpService;
