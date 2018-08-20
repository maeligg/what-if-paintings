var express = require('express'),
    mastodon = require('./fediverse/mastodon.js'),
    helpers = require(__dirname + '/helpers.js'),
    app = express();

app.use(express.static('public'));

/*

This project uses the node-mastodon package, see documentation here:

https://www.npmjs.com/package/mastodon

The M object is available as mastodon.M, see below for an example on how to send a toot.

*/

app.all(`/${process.env.BOT_ENDPOINT}`, function (req, res) {
  mastodon.M.post('statuses', {
// See https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#posting-a-new-status
    spoiler_text: '👋',
    status: 'hello world',
    visibility: 'unlisted'
  }).then(function(res){
    console.log(res.data);
    res.sendStatus(200);
  });
});

var listener = app.listen(process.env.PORT, function () {
  console.log(`your bot is running on port ${listener.address().port}`);
});
