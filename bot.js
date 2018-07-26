var express = require('express'),
    mastodon = require('./fediverse/mastodon.js');

var app = express();
app.use(express.static('public'));

app.all("/" + process.env.BOT_ENDPOINT, function (req, res) {
  if (mastodon.tryToToot('Hello world!')){
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
});

var listener = app.listen(process.env.PORT, function () {
  console.log(`your bot is running on port ${listener.address().port}`);
});
