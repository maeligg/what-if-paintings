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

function post_toot(status){
  console.log('tooting!');
  twit.post('statuses', { status: status }, function(err, data, response) {
    console.log(`posted status: ${status}`);
  });
}

module.exports.toot = function(status){
  if (!twit){
    console.error('please update your .env file')
    return false;
  }
  if (status.length > 500){
    console.error(`status too long: ${status}`);
    return false;
  }
    
  post_toot(status);
  return true;
}