import 'dotenv/config';
import { REST, Routes } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const token = process.env.DISCORD_TOKEN;
const clientId = process.env.DISCORD_CLIENT_ID;
const guildId = process.env.GUILD_ID || '';
if (!token || !clientId) {
  console.error('Missing DISCORD_TOKEN or DISCORD_CLIENT_ID');
  process.exit(1);
}

const commands = [];
const commandsPath = path.resolve('src/commands');
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
  const full = path.join(commandsPath, file);
  const mod = await import(pathToFileURL(full).href);
  if (mod.data) commands.push(mod.data.toJSON());
}

const rest = new REST({ version: '10' }).setToken(token);

async function main() {
  try {
    if (guildId) {
      console.log('Registering guild commands to', guildId);
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });
    } else {
      console.log('Registering GLOBAL commands (can take time to propagate).');
      await rest.put(Routes.applicationCommands(clientId), { body: commands });
    }
    console.log('Done.');
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}
main();
