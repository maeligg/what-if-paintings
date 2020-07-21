require('dotenv').config();
const fs = require('fs'),
    path = require('path')
    Twit = require('twit'),
    config = {
    /* Be sure to update the .env file with your API keys. See how to get them: https://botwiki.org/tutorials/how-to-create-a-twitter-app */      
      twitter: {
        consumer_key: process.env.CONSUMER_KEY,
        consumer_secret: process.env.CONSUMER_SECRET,
        access_token: process.env.ACCESS_TOKEN,
        access_token_secret: process.env.ACCESS_TOKEN_SECRET
      },
      mastodon: {
        access_token: process.env.MASTODON_ACCESS_TOKEN,
        api_url: process.env.MASTODON_API
      }
    },
    T = new Twit(config.twitter),
    Mastodon = require('mastodon');

let M;
try {
  M = new Mastodon(config.mastodon);
  console.log('ready to toot...');
} catch(err) {
  console.error(err);
  console.error('please update your .env file')
}

const generateMessage = (fileName) => {
  fileInfo = fileName.replace(/.(jpg)|(jpeg)|(png)/, '').replace(/-/g, ' ').replace(/(%\d?\d?[A-Z]?)/g, (match, $1) => {
 return decodeURIComponent($1);
}).split('_');
  
  return `${fileInfo[0]}, by ${fileInfo[1]}`;
};

fs.readdir(path.join(__dirname, 'images'), function (err, files) {
  if (err) {
    return console.log('Unable to scan directory: ' + err);
  }

  const randomImage = files[Math.floor(Math.random() * files.length)];
  const message = generateMessage(randomImage);
  const b64content = fs.readFileSync(`${__dirname}/images/${randomImage}`, { encoding: 'base64' });

  M.post('media', { 
    file: fs.createReadStream(`${__dirname}/images/${randomImage}`)
  }, function (err, data, response) {
    if (err) {
      console.log('ERROR:\n', err);
    } else {
      console.log('tooting the image...');
      M.post('statuses', {
        status: message,
        media_ids: new Array(data.id)
      },
      function(err, data, response) {
        if (err){
          console.log('ERROR:\n', err);
        }
        else{
          console.log('tooted');
        }
      });
    }
  });
  
  T.post('media/upload', { media_data: b64content }, function(err, data, response) {
    if (err) {
      console.log('error!', err);
      res.sendStatus(500);
    } else{
      console.log('tweeting the image...');
      
      T.post('statuses/update', {
        status: message,
        media_ids: new Array(data.media_id_string)
      },
      function(err, data, response) {
        if (err){
          console.log('ERROR:\n', err);
        }
      });
    }
  });

  return;
});
