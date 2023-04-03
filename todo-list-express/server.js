const http = require('node:http');

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

const { Server } = require('socket.io')

const dbSetup = require('./db');
const todoRouter = require('./todos/route');
const userRouter = require('./users/route');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(helmet());
app.use(cors({ 
    origin: ['*'],
    methods: ['POST', 'GET']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    
  }
});

io.on('connection', (socket) => {
  console.log(`${socket.id} just connected`);
})

function createServer() {
    dbSetup();
    app.use('/api/todos', todoRouter);
    app.use('/api/users', userRouter);
    app.use(errorHandler);
    return server;
}

module.exports = createServer;