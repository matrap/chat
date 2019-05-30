import express from 'express';
import path from 'path';
import open from 'open';
import http from 'http';
import * as bodyParser from 'body-parser';
import { defineRouter, defineSockets } from './api';

import compression from 'compression';
import colors from 'colors';

/*eslint-disable no-console */

const DEFAULT_PORT = 3000;
const app = express();
app.set('port', process.env.PORT || DEFAULT_PORT);

const server = app.listen(app.get('port'));
const io = require('socket.io').listen(server);
const router = express.Router();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);
app.use(compression());
app.use(express.static('dist'));

defineRouter(router);
defineSockets(io);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

console.log('Server is running in release mode...'.green);