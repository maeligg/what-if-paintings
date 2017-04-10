var express = require('express'),
    mastodon = require('./mastodon.js'), // this require() will log an error if you don't have your .env file setup correctly
    grammar = require('./tracery.js').grammar;

var app = express();

app.use(express.static('public')); // serve static files like index.html http://expressjs.com/en/starter/static-files.html

function generateStatus() {
  // Generate a new tweet using our grammar
  return grammar.flatten("#origin#"); // make sure an "origin" entry is in your grammar.json file
}

app.all("/toot", function (request, response) { // send a GET or POST to /toot to trigger a toot http://expressjs.com/en/starter/basic-routing.html
  var newStatus = generateStatus();

  console.log("Got a hit!");
  if (mastodon.tryToToot(newStatus)){ // Some things could prevent us from tooting. Find out more in mastodon.js
    response.sendStatus(200);  // We successfully tweeted
  } else {
    response.sendStatus(500); // Something prevented us from toot
  }
  
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
  console.log('Here are some statuses:');
  for(var i = 0; i < 5; i++){console.log(generateStatus())};
  console.log("✨🔮✨")
});
