

const express = require('express');
import { Application } from 'express';
import * as fs from 'fs';
import * as https from 'https';
import { AddressInfo } from 'net';
import { readAllLessons } from "./read-all-lessons.route";
import { userInfo } from './user-info.route';
const bodyParser = require('body-parser');
const jwksRsa = require('jwks-rsa');
const jwt = require('express-jwt');


const app: Application = express();

app.use(bodyParser.json());

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
  { name: 'secure', type: Boolean, defaultOption: !true },
];

const options = commandLineArgs(optionDefinitions);

const checkIfAuthenticated = jwt({
  secret: jwksRsa.expressJwtSecret({
    cashe: true,
    rateLimit: true,
    jwksUri: "https://dev-t8irge8s.eu.auth0.com/.well-known/jwks.json"
  }),
  algorithms: ['RS256']
});

app.use(checkIfAuthenticated);

app.use((err, req, res, next) => {
  if(err && err.name == "UnauthorizedError"){
    res.status(err.status).json({message: err.message});
  }else {
    next();
  }
});

// REST API
app.route('/api/lessons')
  .get(readAllLessons);

app.route('/api/userInfo')
  .put(userInfo);
  
if (options.secure) {

  const httpsServer = https.createServer({
    key: fs.readFileSync('key.pem'),
    cert: fs.readFileSync('cert.pem')
  }, app);

  // launch an HTTPS Server. Note: this does NOT mean that the application is secure
  httpsServer.listen(9000, () => console.log("HTTPS Secure Server running at https://localhost:" + (<AddressInfo>httpsServer.address()).port));

}
else {

  // launch an HTTP Server
  const httpServer = app.listen(9000, () => {
    console.log("HTTP Server running at https://localhost:" + (<AddressInfo>httpServer.address()).port);
  });

}

