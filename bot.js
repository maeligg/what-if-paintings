var storage = require('node-persist'),
    Twit = require('twit'),
    traceryGenerator = require('./tracery.js'),
    now = Date.now(), // 
    lastRun;


storage.initSync();

var T = new Twit(
{
    consumer_key:         process.env.TWITTER_CONSUMER_KEY
  , consumer_secret:      process.env.TWITTER_CONSUMER_SECRET
  , access_token:         process.env.TWITTER_ACCESS_TOKEN
  , access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
}
);

lastRun = storage.getItemSync("lastRun") || 0;
console.log("Last Run On:", lastRun);
if (now - lastRun > (1000 * 60 * 5)) { // 5 minutes
  console.log("Can run again");
  T.post('statuses/update', { status: traceryGenerator.generateTweet() }, function(err, data, response) {
    console.log(data);
  });
  storage.setItemSync("lastRun", now);
} else {
  console.log("It's too soon", now - lastRun );
}

// T.get('statuses/mentions_timeline', { count: 10, include_entities: false }, function(err, data, response) {
//   console.log(response);
//   data.map(respondToTweet);
  
// });

// function respondToTweet(tweet){
//   console.log(tweet.text);
// }


