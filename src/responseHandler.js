const fs = require('fs');
// const resUtil = require('./responseUtilities.js');

const indexFile = fs.readFileSync(`${__dirname}/../client/client.html`);
const cssFile = fs.readFileSync(`${__dirname}/../client/style.css`);
const jsFile = fs.readFileSync(`${__dirname}/../client/index.js`);

const users = {};

const ResObjs = {
  badRequest: { id: 'badRequest', message: 'Name and age are both required' },
  created201: { id: 'created', message: 'created Successfully' },
  notFound: { id: 'notFound', message: 'The page you were looking for was not found' },
};

const jsonHandler = (response, obj, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  if (obj) response.write(JSON.stringify(obj));
  response.end();
};

const getIndex = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write(indexFile);
  response.end();
};

const getCSS = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/css' });
  response.write(cssFile);
  response.end();
};

const getJs = (response) => {
  response.writeHead(200, { 'Content-Type': 'text/javascript' });
  response.write(jsFile);
  response.end();
};

const getUsers = (response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify({ users }));
  response.end();
};
const getUsersH = (response) => {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end();
};

const addUser = (response, request) => {
  const body = [];
  request.on('data', (chunk) => {
    body.push(chunk);
    if (body.length > 1e6) {
      // FLOOD ATTACK OR FAULTY CLIENT, NUKE REQUEST
      request.removeAllListeners();
      request.connection.destroy();
    }
  });
  request.on('error', (err) => {
    // eslint-disable-next-line no-console
    console.dir(err);
    response.statusCode = 400;
    response.end();
  });
  request.on('end', async () => {
    const bodyJSON = await JSON.parse(Buffer.concat(body).toString());

    if (!bodyJSON.name || !bodyJSON.age) {
      return jsonHandler(response, ResObjs.badRequest, 400);
    }
    let code = 201;
    if (bodyJSON.name in users) { // user exists
      code = 204;
    } else { // user does not exist
      users[bodyJSON.name] = { name: bodyJSON.name, age: bodyJSON.age };
    }
    users[bodyJSON.name].age = bodyJSON.age;
    response.writeHead(code, { 'Content-Type': 'application/json' });
    return jsonHandler(response, code === 204 ? {} : ResObjs.created201, code);
  });
};

const getNotReal = (response) => {
  jsonHandler(response, ResObjs.notFound, 404);
};
const getNotRealH = (response) => {
  response.writeHead(404, { 'Content-Type': 'application/json' });
  response.end();
};

module.exports = {
  getIndex,
  getCSS,
  getUsers,
  addUser,
  getNotReal,
  getNotRealH,
  getUsersH,
  getJs,
};
