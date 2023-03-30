const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const dbSetup = require('./db');
const todoRouter = require('./todos/route');

const server = express();
server.use(helmet());
// server.use(cors({ 
//     origin: ['*'],
//     methods: ['POST', 'GET']
// }));

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(morgan('tiny'));
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

function createServer() {
    dbSetup();
    server.use('/api/todos', todoRouter);
    return server;
}

module.exports = createServer;