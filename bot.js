var express = require('express'),
    mastodon = require('./fediverse/mastodon.js'),
    helpers = require(__dirname + '/helpers.js'),
    app = express();

app.use(express.static('public'));

app.all(`/${process.env.BOT_ENDPOINT}`, function (req, res) {
  mastodon.toot(helpers.random_from_array([
      'hello',
      'hello world',
      '👋',
    ]), function(err){
    if (!err){
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  });  
});

var listener = app.listen(process.env.PORT, function () {
  console.log(`your bot is running on port ${listener.address().port}`);
});
