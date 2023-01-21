const axios = require("axios");
const input = (day) => {
  //add cookie to request
  const cookie = `session=${process.env.SESSION_NUMBER}`;
  axios.defaults.headers.common["Cookie"] = cookie;
  const request = axios.get(`https://adventofcode.com/2022/day/${day}/input`);
  return request;
};

module.exports = { input };
