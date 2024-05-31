// Imported required packages
const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose');
require('dotenv').config()

const api = require("./routes");
const passport = require('./Auth/PassportSetup');
const Employee = require('./Models/Employee');

// MongoDB Databse url
var mongoDatabase = 'mongodb://127.0.0.1:27017/OrgEmpMgmnt';

// Created express server
const app = express();
mongoose.Promise = global.Promise;

// Connect Mongodb Database
mongoose.connect(mongoDatabase, { useNewUrlParser: true }).then(
    () => { console.log('Database is connected') },
    err => { console.log('There is problem while connecting database ' + err) }
);

app.use(passport.initialize());
app.use(express.json());
// const loginRouter = express.Router();
// loginRouter.post('/', passport.authenticate('local', { session: false }), login);


const loginRouter = express.Router();

loginRouter.post('/', passport.authenticate('local', { session: false }), (req, res) => {
  res.json({ message: 'Logged in successfully', Employee: req.user });
});

app.use('/api/login', loginRouter);
// Conver incoming data to JSON format
app.use(bodyParser.json());

// Enabled CORS
app.use(cors());

const corsOptions = {
    origin:[ 'http://localhost:3000/','http://localhost:4000/api/'], // Replace with the allowed origin(s)
    methods: ['GET', 'POST','PUT'], // Specify the allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify the allowed headers
  };
  
  app.use(cors(corsOptions));
  

//Routes
app.use('/api', api);

// Setup for the server port number
const port = process.env.PORT || 4000;

// Staring our express server
const server = app.listen(port, function () {
    console.log('Server Lisening On Port : ' + port);
});
