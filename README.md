# What if paintings

This is a Node.js bot that posts images on Mastodon at [@what_if_paintings](https://botsin.space/@what_if_paintings) and on Twitter at [@WhatIfPaintings](https://twitter.com/WhatIfPaintings). The images are pregenerated using Tensorflow and [neural-style](https://github.com/anishathalye/neural-style).

## Set up

1. Fork this project.
2. [Create an account for your bot](https://botwiki.org/resource/tutorial/how-to-make-a-mastodon-botsin-space-app-bot/), preferably on [botsin.space](http://botsin.space), a Mastodon instance dedicated to bots.
3. Update your `.env` file:
- `MASTODON_API`: for example `https://mastodon.social/api/v1/`, or `https://botsin.space/api/v1/`, based on where you created your bot.
- `MASTODON_ACCESS_TOKEN`: the Mastodon token you acquired in step 2
- `CONSUMER_KEY`: from the Twitter API
- `CONSUMER_SECRET`: from the Twitter API
- `ACCESS_TOKEN`: from the Twitter API
- `ACCESS_TOKEN_SECRET`: from the Twitter API
4. Run `node index.js` or `npm run start`