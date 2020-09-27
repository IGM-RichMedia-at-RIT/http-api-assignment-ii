const http = require('http');
const urlPackage = require('url');

const responseHandler = require('./responseHandler.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const dispatchTable = {
  GET: {
    '/': responseHandler.getIndex,
    '/index.js': responseHandler.getJs,
    '/style.css': responseHandler.getCSS,
    '/getUsers': responseHandler.getUsers,
    '/notReal': responseHandler.getNotReal,
  },
  POST: { '/addUser': responseHandler.addUser },
  HEAD: {
    '/getUsers': responseHandler.getUsersH,
    '/notReal': responseHandler.getNotRealH,
  },
};

const onRequest = (request, response) => {
  const uriPath = urlPackage.parse(request.url, true).pathname;
  if (uriPath in dispatchTable[request.method]) {
    dispatchTable[request.method][uriPath](response, request);
  } else {
    responseHandler.getNotReal(response);
  }
};

http.createServer(onRequest).listen(port);
