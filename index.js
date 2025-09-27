import 'dotenv/config';
import { Client, GatewayIntentBits, Partials, Events, Collection } from 'discord.js';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('Missing DISCORD_TOKEN');
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
  partials: [Partials.Channel],
});
client.commands = new Collection();

const commandsPath = path.resolve('src/commands');
for (const file of fs.readdirSync(commandsPath).filter(f => f.endsWith('.js'))) {
  const full = path.join(commandsPath, file);
  const mod = await import(pathToFileURL(full).href);
  if (mod.data && mod.execute) {
    client.commands.set(mod.data.name, mod);
  }
}

client.once(Events.ClientReady, (c) => {
  console.log(`CFPBot (Discord) logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const cmd = client.commands.get(interaction.commandName);
  if (!cmd) return interaction.reply({ ephemeral: true, content: 'Unknown command.' });

  try {
    await cmd.execute(interaction);
  } catch (e) {
    console.error(e);
    if (interaction.deferred || interaction.replied) {
      await interaction.followUp({ ephemeral: true, content: 'Something went wrong.' });
    } else {
      await interaction.reply({ ephemeral: true, content: 'Something went wrong.' });
    }
  }
});

client.login(token);
