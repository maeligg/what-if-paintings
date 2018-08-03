![Toot!](https://cdn.glitch.com/f44e0bef-fc19-4942-a12f-61c6eef11180%2Fimg-wide.png?1532633679042)

# Fediverse bot starter project [BETA]

*Note: Currently only supports Mastodon, more networks to come.*

## Set up

1. Remix this project.
2. Create an account for your bot. Check out [botsin.space](http://botsin.space), a Mastodon instance dedicated to bots.
3. Update your `.env` file:

`MASTODON_API`: for example `https://mastodon.social/api/v1/`, or `https://botsin.space/api/v1/` based on where you created your bot.

Get your [Mastodon OAuth token](https://tinysubversions.com/notes/mastodon-bot/index.html) and save it as `MASTODON_ACCESS_TOKEN` 


4. Update `bot.js` with your bot's code. See the `examples` folder for what you can do. Also check out the [documentation for the node-mastodon library](https://github.com/jhayley/node-mastodon) and the [Mastodon API](https://github.com/tootsuite/documentation/blob/master/Using-the-API/API.md).


Based on [~tracery-mastodon-bot](https://glitch.com/~tracery-mastodon-bot) by [Byron Hulcher](http://twitter.com/hypirlink).
