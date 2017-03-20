var express = require('express'),
    twitter = require('./twitter.js'),
    grammar = require('./tracery.js').grammar;


function generateStatus() {
  // Generate a new tweet using our grammar
  return grammar.flatten("#origin#"); // make sure an "origin" entry is in your grammar.json file
}


var app = express();
app.use(express.static('public')); // serve static files like index.html

// http://expressjs.com/en/starter/basic-routing.html
app.get("/tweet", function (request, response) {
  var newStatus = generateStatus();
  console.log("Got a hit!");
  if (twitter.tryToTweet(newStatus)){
    response.sendStatus(200);
  } else {
    response.sendStatus(500);
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
