This is kind of of [Cheap Bots, Done Quick!](http://cheapbotsdonequick.com/) that runs as a single bot. It is based on [v21/tracerybot](http://github.com/v21/tracerybot)

How to build your own bot:
- Click the project settings in the upper-left and "Remix This"!
- Modify the [tracery](http://www.crystalcodepalace.com/traceryTut.html) grammar in `grammar.json`
- Get your [Twitter OAuth tokens](http://botwiki.org/tutorials/how-to-create-a-twitter-app ) and add them to `.env` 
- Modify how frequently it will be allowed to post in `.env`
- Send a POST request to `{Glitch URL}/tweet` (for instance: `http://tracert-twitter-bot/tweet` for the `tracery-twitter-bot` project)
- Use a cron or uptime service (like [Uptime Robot](http://uptimerobot.com)) to hit the above URL to trigger the bot regularly

🤖 [Byron Hulcher](http://twitter.com/hypirlink)