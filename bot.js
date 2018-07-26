var express = require('express'),
    mastodon = require('./fediverse/mastodon.js'),
    helpers = require(__dirname + '/helpers.js'),
    app = express();

app.use(express.static('public'));

app.all(`/${process.env.BOT_ENDPOINT}`, function (req, res) {
  helpers.load_image_assets(function(err, urls){
    
    /* First, load images from the assets folder. */

    if (!err && urls && urls.length > 0){

      /* Pick a random image. */
      
      var url = helpers.random_from_array(urls);

      /* You could also get the first image alphabetically. */
      //  var url = urls.sort()[0];

      /* If you want to delete the image after it's posted, update your .env file: */
      //  REMOVE_POSTED_IMAGES='yes'

      helpers.load_image(url, function(err, img_file){

        mastodon.post_image(helpers.random_from_array([
          'Check this out!',
          'New picture!'
        ]), img_file, function(err){
          if (!err){
            var remove_posted_images = process.env.REMOVE_POSTED_IMAGES;
            if (remove_posted_images === 'yes' || remove_posted_images === 'true'){
              helpers.remove_asset(url);
            }
          }        
        });
      });
    }
    res.sendStatus(200);
  });  
});

var listener = app.listen(process.env.PORT, function () {
  console.log(`your bot is running on port ${listener.address().port}`);
});
