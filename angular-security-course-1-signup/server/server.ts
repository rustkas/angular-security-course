

import * as express from 'express';
import {Application} from "express";
import * as fs from 'fs';
import * as https from 'https';
import { AddressInfo } from 'net';
import { createUser } from './create-user.route';
import {readAllLessons} from "./read-all-lessons.route";

const bodyParser = require('body-parser');

const app: Application = express();

app.use(bodyParser.json());

const commandLineArgs = require('command-line-args');

const optionDefinitions = [
    { name: 'secure', type: Boolean,  defaultOption: false },
];

const options = commandLineArgs(optionDefinitions);


// REST API
app.route('/api/lessons')
    .get(readAllLessons);

app.route('/api/signup')
    .post(createUser)

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








