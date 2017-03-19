var storage = require('node-persist'),
    Twit = require('twit'),
    traceryGenerator = require('./tracery.js'),
    now = Date.now(), // time since epoch in milliseconds
    postDelay = process.env.POST_DELAY_IN_MINUTES || 60,
    lastRun,
    newTweet;

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
if (now - lastRun > (1000 * 60 * postDelay)) { //Post every process.env.POST_DELAY_IN_MINUTES or 60 minutes
  // Generate a new tweet using our grammary
  newTweet = traceryGenerator.generateTweet();
  
  // Post it to Twitter
  T.post('statuses/update', { status: newTweet }, function(err, data, response) {
    console.log(`posted: ${newTweet}`)
  });
  
  storage.setItemSync("lastRun", now);
} else {
  console.log(`It's too soon, we only post every ${postDelay} minutes. It's only been ${ Math.floor((now - lastRun) / 60 / 1000 ) } minutes`);
}
