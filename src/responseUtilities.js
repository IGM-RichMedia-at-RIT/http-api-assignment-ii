// const responseHandler = require('./responseHandler');

const headerMaker = (response, method, status) => {
  response.statusCode = status;
  switch (method) {
    case 'GET':
      break;
    case 'HEAD':
      break;
    default:
      response.statusCode = 404;
  }
};

// const ResMessages = {

// };

module.exports = {
  headerMaker,
};
