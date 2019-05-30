import express from 'express';
import path from 'path';
import open from 'open';
import http from 'http';
import * as bodyParser from 'body-parser';
import { defineRouter, defineSockets } from './api';

import webpack from 'webpack';
import config from '../webpack.config.dev';

/* eslint-disable no-console */

const DEFAULT_PORT = 3000;
const app = express();
app.set('port', process.env.PORT || DEFAULT_PORT);

const server = http.Server(app);
const io = require('socket.io')(server);
const compiler = webpack(config);
const router = express.Router();

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));
app.use(require('webpack-hot-middleware')(compiler));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

defineRouter(router);
defineSockets(io);

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../src/index.html'));
});

server.listen(app.get('port'), function (err) {
    if (err) {
        console.log(err);
    } else {
        open(`http://localhost:${app.get('port')}`);
    }
});