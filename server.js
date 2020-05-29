// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require ('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, function () {
    console.log(`running on localhost: ${port}`);
});


//GET
app.get('/all', getData);

function getData(req, res){
  res.send(projectData);
  console.log(projectData);
  console.log('app__get');

}

//POST
app.post('/addInfo', addResponse);

  function addResponse(req, res){
    let newEntry = {
      date:req.body.date,
      temperature: req.body.temperature,
      userFeelings: req.body.userResponse
    };
    console.log('app_post');
    Object.assign(projectData,newEntry);
  }
