Create a generative Twitter bot using [Tracery](http://tracery.io/). 

This is a version of [Cheap Bots, Done Quick!](http://cheapbotsdonequick.com/) that runs as a single bot. It is based on [v21/tracerybot](http://github.com/v21/tracerybot). 

How to build your own bot:
- Click the settings above and "Remix" this project!
- Modify the [Tracery](http://tracery.io/) grammar in `grammar.json`. Here's a [tutorial](http://www.crystalcodepalace.com/traceryTut.html). The tweet will start from field "origin".
- Get your [Twitter OAuth tokens](http://botwiki.org/tutorials/how-to-create-a-twitter-app ) and add them to `.env` 
- Modify how frequently it will be allowed to post by settings POST_DELAY_IN_MINUTES in `.env`
- Send a GET or POST request to `{Glitch URL}/tweet` (for instance: `https://tracery-twitter-bot.glitch.me/tweet` for the `tracery-twitter-bot` project)
- Use a cron or uptime service (like [Uptime Robot](http://uptimerobot.com)) to hit the above URL to trigger the bot regularly

Things you could try:
- Completely replacing grammar.json with your own content 
- Instead of using Tracery, find a different way to generate text and use that in `generateStatus()` in `bot.js`
- 

🤖 [Byron Hulcher](http://twitter.com/hypirlink)