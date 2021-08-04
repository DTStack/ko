const urllib = require('urllib');

module.exports = {
  get: (data, url) => {
    return urllib.request(url, {
      method: 'GET',
      dataType: 'json',
      data,
    });
  },
  post: (data, url) => {
    return urllib.request(url, {
      method: 'POST',
      dataType: 'json',
      data,
    });
  },
};
