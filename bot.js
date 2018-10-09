var fs = require('fs'),
    express = require('express'),
    mastodon = require('./fediverse/mastodon.js'),
    helpers = require(__dirname + '/helpers.js'),
    app = express(),
    Twit = require('twit'),
    config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */      
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      }
    },
    T = new Twit(config.twitter);

app.use(express.static('public'));

app.all(`/${process.env.BOT_ENDPOINT}`, function (req, res) {
  /* First, load images from the assets folder. */

  helpers.load_image_assets(function(err, urls){
    /* Let's make sure we have some images. */

    if (urls && urls.length > 0){

      /* Pick a random image. */
      
      var url = helpers.random_from_array(urls);

      /* You could also get the first image alphabetically. */
      //  var url = urls.sort()[0];

      /* If you want to delete the image after it's posted, add this to your .env file: */
      //  REMOVE_POSTED_IMAGES='yes'

      helpers.load_image(url, function(err, img_file){
        const message = generateMessage(url);
        const b64content = fs.readFileSync('/path/to/img', { encoding: 'base64' });
        
        mastodon.post_image(message, img_file, function(err){
          if (!err){
            if (process.env.REMOVE_POSTED_IMAGES === 'yes'){
              helpers.remove_asset(url);
            }
          } else {
            console.log(err);
          }   
        });
        
        
        T.post('media/upload', { media_data: img_file }, function(err, data, response) {
          if (err){
            console.log('error!', err);
            res.sendStatus(500);
          }
          else{
            console.log('tweeting the image...');
            T.post('statuses/update', {
              status: message,
              media_ids: new Array(data.media_id_string)
            },
            function(err, data, response) {
              if (err){
                console.log('ERROR:\n', err);
              }
              else{
                res.sendStatus(200);
              }
            });
          }
        });
      });
    }
    res.sendStatus(200);
  });  
});

const generateMessage = (url) => {
  let fileInfo = helpers.get_filename_from_url(url).split('%2F')[1];
  fileInfo = fileInfo.replace(/.(jpg)|(jpeg)|(png)/, '').replace(/-/g, ' ').replace(/(%\d?\d?[A-Z]?)/g, (match, $1) => {
 return decodeURIComponent($1);
}).split('_');
  
  return `${fileInfo[0]}, by ${fileInfo[1]}`;
};

var listener = app.listen(process.env.PORT, function () {
  console.log(`your bot is running on port ${listener.address().port}`);
});
