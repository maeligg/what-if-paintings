var express = require('express'),
    twitter = require('./twitter.js'), // this require() will log an error if you don't have your .env file setup correctly
    grammar = require('./tracery.js').grammar;

var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public')); // serve static files like index.html

function generateStatus() {
  // Generate a new tweet using our grammar
  return grammar.flatten("#origin#"); // make sure an "origin" entry is in your grammar.json file
}

// http://expressjs.com/en/starter/basic-routing.html
app.all("/tweet", function (request, response) {
  var newStatus = generateStatus();

  console.log("Got a hit!");
  if (twitter.tryToTweet(newStatus)){
    response.sendStatus(200);  // We successfully tweeted
  } else {
    response.sendStatus(500); // Something prevented us from tweeting
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
