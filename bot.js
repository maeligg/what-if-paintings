var express = require('express'),
    storage = require('node-persist'),
    Twit = require('twit'),
    grammar = require('./tracery.js').grammar;

storage.initSync();

var twit = new Twit({
  consumer_key:         process.env.TWITTER_CONSUMER_KEY,
  consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
  access_token:         process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
});

function generateStatus() {
  // Generate a new tweet using our grammary
  return grammar.flatten("#origin#"); // make sure an "origin" entry is in your grammar.json file
}

function postTweet(status){
  // Post it to Twitter
  twit.post('statuses/update', { status: status }, function(err, data, response) {
    console.log(`Posted status: ${status}`)
  });
}

function tryToTweet(){
  var now = Date.now(), // time since epoch in millisecond
      lastRun = storage.getItemSync("lastRun") || 0, // last time we were run in milliseconds
      postDelay = process.env.POST_DELAY_IN_MINUTES || 60, // time to delay between tweets in minutes
      status;
  
  if (now - lastRun > (1000 * 60 * postDelay)) { //Post every process.env.POST_DELAY_IN_MINUTES or 60 minutes
    status = generateStatus();
    if (status && status.length && status.length <= 140){
      console.log("Tweeting!");
      postTweet(status);
      storage.setItemSync("lastRun", now);
    } else {
      console.log("Couldn't generate a good status: ${status}");
    }
  } else {
    console.log(`It's too soon, we only post every ${postDelay} minutes. It's only been ${ Math.floor((now - lastRun) / 60 / 1000 ) } minutes`);
  }
}

var app = express();
// http://expressjs.com/en/starter/basic-routing.html
app.post("/tweet", function (request, response) {
  console.log("Got a request!");
  tryToTweet();
  response.sendStatus(200)
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

console.log("Server live");
