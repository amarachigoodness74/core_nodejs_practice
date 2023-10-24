const axios = require("axios");

const get = async (url) => {
  try {
    const res = await axios.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    return 'Error occurred. Try again!';
  }
};

module.exports = {
  get,
};
