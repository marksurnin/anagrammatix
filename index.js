// Import the Express module
var express = require('express');

// Import the 'path' module (packaged with Node.js)
var path = require('path');

// Create a new instance of Express
var app = express();

// Import the Anagrammatix game file.
var agx = require('./agxgame');

var Request = require('request');
var bodyParser = require('body-parser');

// Create a simple Express application
app.configure(function() {
    // Turn down the logging activity
    app.use(express.logger('dev'));

    // Serve static html, js, css, and image files from the 'public' directory
    app.use(express.static(path.join(__dirname,'public')));

    app.use(bodyParser.json());

    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });
});


//******* DATABASE Configuration *******
// The username you use to log in to cloudant.com
var CLOUDANT_USERNAME="marksurnin";
// The name of your database
var CLOUDANT_DATABASE="mental_math";
// These two are generated from your Cloudant dashboard of the above database.
var CLOUDANT_KEY="ofspeadschismosserfundow";
var CLOUDANT_PASSWORD="5b622012c81d8681c5e73c0061cc13a4e1893077";

var CLOUDANT_URL = "https://" + CLOUDANT_USERNAME + ".cloudant.com/" + CLOUDANT_DATABASE;

var port = process.env.PORT || 3000;
// Create a Node.js based http server on port 8080
var server = require('http').createServer(app).listen(port);
console.log('Express started on port ' + port); 

// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);

// Reduce the logging output of Socket.IO
io.set('log level',1);

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
    //console.log('client connected');
    agx.initGame(io, socket);
});

// Shamelessly borrowed from https://github.com/craigprotzel/Mashups/tree/master/10_The_Server_Plus_Storage
app.post("/save", function (request, response) {
  console.log("Making a post!", request);
  // Use the Request lib to POST the data to the CouchDB on Cloudant
  Request.post({
    url: CLOUDANT_URL,
    auth: {
      user: CLOUDANT_KEY,
      pass: CLOUDANT_PASSWORD
    },
    json: true,
    body: request.body
  },
  function (err, res, body) {
    if (res.statusCode == 201){
      console.log('Doc was saved!');
      response.json(body);
    }
    else{
      console.log('Error: '+ res.statusCode);
      console.log(body);
    }
  });
});

// GET - API route to get the CouchDB data after page load.
app.get("/api", function (request, response) {
  // Use the Request lib to GET the data in the CouchDB on Cloudant
  Request.get({
    url: CLOUDANT_URL+"/_all_docs?include_docs=true",
    auth: {
      user: CLOUDANT_KEY,
      pass: CLOUDANT_PASSWORD
    },
    json: true
  }, function (err, res, body){
    //Grab the rows
    var data = body.rows;

    if (data){
      // Now use Express to render the JSON.
      response.json(data);
    }
    else{
      response.json({noData:true});
    }
  });
});