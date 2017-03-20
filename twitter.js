var storage = require('node-persist'),
    Twit = require('twit'),
    twit;

storage.initSync();

try {
  twit = new Twit({
    consumer_key:         process.env.TWITTER_CONSUMER_KEY,
    consumer_secret:      process.env.TWITTER_CONSUMER_SECRET,
    access_token:         process.env.TWITTER_ACCESS_TOKEN,
    access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
  });
} catch(err) {
  console.error(err);
  console.error("Sorry, your .env file does not have the correct settings in order to tweet");
}

function postTweet(status){
  // Post a status to twitter to Twitter
  twit.post('statuses/update', { status: status }, function(err, data, response) {
    console.log(`Posted status: ${status}`)
  });
}

module.exports.tryToTweet = function(status){
  var now = Date.now(), // time since epoch in millisecond
      lastRun = storage.getItemSync("lastRun") || 0, // last time we were run in milliseconds
      postDelay = process.env.POST_DELAY_IN_MINUTES || 60, // time to delay between tweets in minutes
      status;
  
  if (now - lastRun > (1000 * 60 * postDelay)) { //Post every process.env.POST_DELAY_IN_MINUTES or 60 minutes
    status = generateStatus();
    if (status.length <= 140){
      console.log("Tweeting!");
      postTweet(status);
      storage.setItemSync("lastRun", now);
    } else {
      console.log(`Status too long: ${status}`);
    }
  } else {
    console.log(`It's too soon, we only post every ${postDelay} minutes. It's only been ${ Math.floor((now - lastRun) / 60 / 1000 ) } minutes`);
  }
}

var app = express();
app.use(express.static('public')); // serve static files like index.html


if (twit){
  // http://expressjs.com/en/starter/basic-routing.html
  app.get("/tweet", function (request, response) {
    console.log("Got a hit!");
    tryToTweet();
    response.sendStatus(200)
  });

  console.log("Ready to tweet!");
}

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});