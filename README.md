# CFPBot (Discord Edition)

A modernization of the original Hubot-based CFPBot into a Discord app with slash commands using `discord.js@14`.
(old repo https://github.com/cfpb/CFPBot)
## Features (ported)
- `/help` – Show available commands.
- `/searchcfgov query:<text>` – Search consumerfinance.gov (simple site-limited web search).
- `/standup text:<message>` – Post a standup update; the bot mirrors it into a configured channel (via `STANDUP_CHANNEL_ID`).
- `/highfive user:<@user>` – Give a high five.
- `/rules` – Prints a friendly rules reminder.

## Quick start

1. **Create a Discord application & bot**
   - https://discord.com/developers/applications → *New Application* → *Bot* → *Reset Token* and copy it.
   - Under *Privileged Gateway Intents*, enable **Message Content Intent** only if you later add message listeners. Slash-commands don't need it.

2. **Invite the bot**
   - In *OAuth2 → URL Generator*: scopes = `bot applications.commands`
   - Bot permissions: `Send Messages`, `Use Slash Commands`, `Embed Links`.

3. **Configure**
   ```bash
   cp .env.sample .env
   # fill DISCORD_TOKEN, DISCORD_CLIENT_ID
   # optionally set GUILD_ID for fast, per-guild command registration during dev
   # set STANDUP_CHANNEL_ID to a channel id where standups should be mirrored
   ```

4. **Install & register commands**
   ```bash
   npm install
   npm run register   # registers slash commands (global if no GUILD_ID, per-guild if set)
   ```

5. **Run**
   ```bash
   npm start
   ```

## Deploy tips
- Use Node.js 18+.
- For production, register commands globally (unset GUILD_ID), then run once: `npm run register`.
- Use a process manager (PM2, systemd, Docker) to keep the bot alive.

## Mapping from Hubot
- `search-cfgov.coffee` → `/searchcfgov`
- `standup-copy.coffee` (env `HUBOT_STANDUP_COPY_ROOM`) → `/standup` mirrors to `STANDUP_CHANNEL_ID`
- `help.coffee` → `/help`
- `highfive.coffee` → `/highfive`
- `rules.coffee` → `/rules`

Additional Hubot scripts (memes, maps, translate, youtube, etc.) can be added as extra commands later.

## Security
- Keep your bot token secret. Never commit `.env`.
- Scope permissions minimally.

MIT licensed. Based on CFPB's original CFPBot (Hubot).

## Commands ported from Hubot
- help
- rules
- highfive
- standup (mirroring)
- search-cfgov
- maps (search link)
- math (basic arithmetic)
- meme (memegen.link URL)
- translate (Google Translate link)
- youtube (search link)
- treat (random suggestion)
- kv (simple storage)

### Notes
- `httpd` from Hubot is not needed in Discord; HTTP listeners are out-of-scope for bots unless you host your own web service.
- If you need richer features (real translations, YouTube API, Google Maps Geocoding), we can add APIs and keys later.
