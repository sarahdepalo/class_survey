'use strict';

const http = require('http');
const port = 3000;
const hostname = '127.0.0.1';

const express = require('express');
const app = express();

// Allows you to use your stylesheets and images, etc. 
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const es6Renderer = require('express-es6-template-engine');

app.engine('html', es6Renderer);
app.set('views', './views');
app.set('view engine', 'html');

const server = http.createServer(app);

server.listen(port, hostname, () => {
    console.log(`Server is running at: http://${hostname}:${port}`);
});

const rootController = require('./routes/index');

app.use('/', rootController);