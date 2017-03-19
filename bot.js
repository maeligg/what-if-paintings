var Twit = require('twit'),
    traceryGenerator = 


var T = new Twit(
{
    consumer_key:         process.env.TWITTER_CONSUMER_KEY
  , consumer_secret:      process.env.TWITTER_CONSUMER_SECRET
  , access_token:         process.env.TWITTER_ACCESS_TOKEN
  , access_token_secret:  process.env.TWITTER_ACCESS_TOKEN_SECRET
}
);

// T.post('statuses/update', { status: tweet }, function(err, data, response) {
  //console.log(data);
// })

// T.get('statuses/mentions_timeline', { count: 10, include_entities: false }, function(err, data, response) {
//   console.log(response);
//   data.map(respondToTweet);
  
// });

// function respondToTweet(tweet){
//   console.log(tweet.text);
// }


