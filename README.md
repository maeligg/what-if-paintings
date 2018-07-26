# Fediverse bot starter project


## Set up

1. Remix this project.
2. Create an account for your bot. Check out [botsin.space](http://botsin.space), a Mastodon instance dedicated to bots.
3. Update your `.env` file:
- `MASTODON_API`: for example `https://mastodon.social/api/v1/`, or `https://botsin.space/api/v1/` based on where you created your bot.
- Get your [Mastodon OAuth token](https://tinysubversions.com/notes/mastodon-bot/index.html) and add it to `MASTODON_ACCESS_TOKEN` in `.env` 
- Modify how frequently it will be allowed to post by settings POST_DELAY_IN_MINUTES in `.env`
- Send a GET or POST request to `{Glitch URL}/toot` (for instance: `https://tracery-mastodon-bot.glitch.me/toot` for the `tracery-mnastodon-bot` project)
- Use a cron or uptime service (like [Uptime Robot](http://uptimerobot.com)) to hit the above URL to trigger the bot regularly

Things should try:
- Create a whole new grammar in `grammar.json` (Check out [Cheap Bots, Done Quick!](http://cheapbotsdonequick.com/) for ideas)
- Instead of using Tracery, find a different way to generate text and use that in `generateStatus()` in `bot.js`
- Rub your tummy while patting your head. You've built a Mastodon bot, you can do anything!

🤖 [Byron Hulcher](http://twitter.com/hypirlink)