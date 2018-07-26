var Twit = require('mastodon'),
    twit;

try {
  twit = new Twit({
    'access_token': process.env.MASTODON_ACCESS_TOKEN,
    'api_url': process.env.MASTODON_API || 'https://mastodon.social/api/v1/'
  });
  console.log('ready to toot!');
} catch(err) {
  console.error(err);
  console.error('please update your .env file')
}


module.exports = {
  toot: function(status, cb){
    if (!twit){
      console.error('please update your .env file')
      return false;
    }
    if (status.length > 500){
      console.error(`status too long: ${status}`);
      return false;
    }

    console.log('tooting!');
    twit.post('statuses', { status: status }, function(err, data, response) {
      console.log(`posted status: ${status}`);
    });
    
    if (cb){
      cb(null);
    }
  },
  post_image: function(text, image_base64, cb) {
   twit.post('media/upload', { media_data: image_base64 }, function (err, data, response) {
      if (err){
        console.log('ERROR:\n', err);
        if (cb){
          cb(err);
        }
      }
      else{
        console.log('tweeting the image...');
        twit.post('statuses/update', {
          status: text,
          media_ids: new Array(data.media_id_string)
        },
        function(err, data, response) {
          if (err){
            console.log('ERROR:\n', err);
            if (cb){
              cb(err);
            }
          }
          else{
            console.log('tweeted!');
            if (cb){
              cb(null);
            }
          }
        });
      }
    });
  }  
}


