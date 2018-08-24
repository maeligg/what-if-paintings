var express = require('express'),
    mastodon = require('./fediverse/mastodon.js'),
    helpers = require(__dirname + '/helpers.js'),
    app = express();

app.use(express.static('public'));

app.all(`/${process.env.BOT_ENDPOINT}`, function (req, res) {  
  /*
    This example shows how to handle the "mention", "reblog", "favourite", and "follow" notifications.
    See Notification documentation for more details:

    https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#notification

  */
  mastodon.get_notifications(function(err, notifications){
    if (notifications.length === 0){
      console.log('no new notifications...');
    }
    else{
      notifications.forEach(function(notification){

        if (notification.type === 'follow'){
          
          console.log(`followed by ${notification.account.acct}...`);

          mastodon.toot(`@${notification.account.acct} Thanks for the follow 👋`, function(err, data){
            mastodon.dismiss_notification(notification);
          });
          
        } else if (notification.type === 'mention'){
          
          console.log(`new mention by ${notification.account.acct}...`);

          var bot_response = '👋';
          
          mastodon.reply(notification.status, `@${notification.account.acct} ${bot_response}`, function(err, data){
            if (!err){
              mastodon.dismiss_notification(notification);
            }
          });
          
        } else if (notification.type === 'favourite'){

          console.log(`${notification.account.acct} favorited a toot...`);
          console.log(notification.status.url);

          mastodon.toot(`@${notification.account.acct} Glad you like my toot 👋`, function(err, data){
            if (!err){
              mastodon.dismiss_notification(notification);
            }
          });
       
        } else if (notification.type === 'reblog'){
          
          console.log(`${notification.account.acct} boosted a toot...`);
          console.log(notification.status.url);     
          
          mastodon.toot(`@${notification.account.acct} Glad you like my toot 👋`, function(err, data){
            if (!err){
              mastodon.dismiss_notification(notification);
            }
          });
        }
      });
    }
  });  
  res.sendStatus(200);
});

var listener = app.listen(process.env.PORT, function () {
  console.log(`your bot is running on port ${listener.address().port}`);
});
