var express = require('express'),
    mastodon = require('./fediverse/mastodon.js'),
    helpers = require(__dirname + '/helpers.js'),
    app = express();

app.use(express.static('public'));

app.all(`/${process.env.BOT_ENDPOINT}`, function (req, res) {  
  /*
    See Notification documentation:

    https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md#notification

  */
  mastodon.M.get('notifications', function(err, notifications){
    // console.log(notifications);

    
    if (notifications.length === 0){
      console.log('no new notifications...');
    }
    else{
      notifications.forEach(function(notification){
        var notification_id = notification.id;

        if (notification.type === 'follow'){
          console.log(`followed by ${notification.account.acct}...`);

          mastodon.M.post('statuses', {
            status: `@${notification.account.acct} Thanks for the follow 👋`
          }).then(function(res){
            mastodon.M.post('notifications/dismiss', {
              id: notification_id
            }).then(function(res){
              /* Dismissed notification. */
            });
          });        
        } else if (notification.type === 'mention'){
          console.log(`new mention by ${notification.account.acct}...`);
          console.log(notification.status);

          /*
            Here we can see what's in the toot mentioning us.
          */
          console.log({
            'spoiler_text': notification.status.spoiler_text,
            'content': notification.status.content
          });
          
          /*
            Let's compose our response.
          */
          
          var bot_response = '👋';
          
          mastodon.M.post('statuses', {
            in_reply_to_id: notification.status.id,
            spoiler_text: notification.status.spoiler_text,
            status: `@${notification.account.acct} ${bot_response}`
          }).then(function(res){
            console.log('res', res.data);
            
            mastodon.M.post('notifications/dismiss', {
              id: notification_id
            }).then(function(res){
              /* Dismissed notification. */
            });
          }); 
        } else if (notification.type === 'favourite'){
          console.log(`${notification.account.acct} favorited a toot...`);
          console.log(notification.status.url);
          
          /* Do something? */
          
          mastodon.M.post('notifications/dismiss', {
            id: notification_id
          }).then(function(res){
            /* Dismissed notification. */
          });          
        } else if (notification.type === 'reblog'){
          console.log(`${notification.account.acct} boosted a toot...`);
          console.log(notification.status.url);     
          
          /* Do something? */
          
          mastodon.M.post('notifications/dismiss', {
            id: notification_id
          }).then(function(res){
            /* Dismissed notification. */
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
