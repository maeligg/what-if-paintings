# What if paintings

This is a Node.js bot that posts images on Mastodon. It is based on the [Fediverse bot starter project](https://glitch.com/edit/#!/fediverse-bot) by [@stefan](https://glitch.com/@stefan). The images are pregenerated using Tensorflow and [neural-style](https://github.com/anishathalye/neural-style).

## Set up

1. Remix this project.
2. [Create an account for your bot](https://botwiki.org/resource/tutorial/how-to-make-a-mastodon-botsin-space-app-bot/), preferably on [botsin.space](http://botsin.space), a Mastodon instance dedicated to bots.
3. Update your `.env` file:

- `MASTODON_API`: for example `https://mastodon.social/api/v1/`, or `https://botsin.space/api/v1/`, based on where you created your bot.
- `MASTODON_ACCESS_TOKEN`: the token you acquired in step 2
- `BOT_ENDPOINT`: part of the URL used to wake up your bot (`https://PROJECT_NAME.glitch.me/BOT_ENDPOINT`)


4. Update `bot.js` with your bot's code. See the `examples` folder for what you can do. Also check out the [documentation for the node-mastodon library](https://github.com/jhayley/node-mastodon) and the [Mastodon API](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md).