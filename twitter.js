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
  console.log("Ready to tweet!");
} catch(err) {
  console.error(err);
  console.error("Sorry, your .env file does not have the correct settings in order to tweet");
}

function postTweet(status){
  if (twit){
    console.log("Tweeting!");
    twit.post('statuses/update', { status: status }, function(err, data, response) {
      console.log(`Posted status: ${status}`)
    });
    return true;
  } else {
    console.error("Sorry, have haven't setup twitter yet in your .env")
    return false;
  }
}

module.exports.tryToTweet = function(status){
  var now = Date.now(), // time since epoch in millisecond
      lastRun = storage.getItemSync("lastRun") || 0, // last time we were run in milliseconds
      postDelay = process.env.POST_DELAY_IN_MINUTES || 60;// time to delay between tweets in minutes

  if (now - lastRun > (1000 * 60 * postDelay)) { //Post every process.env.POST_DELAY_IN_MINUTES or 60 minutes
    if (status.length <= 140){
      storage.setItemSync("lastRun", now);
      return postTweet(status);
    } else {
      console.error(`Status too long: ${status}`);
    }
  } else {
    console.error(`It's too soon, we only post every ${postDelay} minutes. It's only been ${ Math.floor((now - lastRun) / 60 / 1000 ) } minutes`);
  }
  return false;
}