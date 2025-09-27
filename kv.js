import { SlashCommandBuilder } from 'discord.js';
import { loadKV, saveKV } from '../storage.js';

export const data = new SlashCommandBuilder()
  .setName('kv')
  .setDescription('Simple key-value storage (persists to disk).')
  .addSubcommand(s=>s.setName('get').setDescription('Get a value').addStringOption(o=>o.setName('key').setDescription('Key').setRequired(true)))
  .addSubcommand(s=>s.setName('set').setDescription('Set a value').addStringOption(o=>o.setName('key').setDescription('Key').setRequired(true)).addStringOption(o=>o.setName('value').setDescription('Value').setRequired(true)))
  .addSubcommand(s=>s.setName('del').setDescription('Delete a key').addStringOption(o=>o.setName('key').setDescription('Key').setRequired(true)));

export async function execute(interaction) {
  const sub = interaction.options.getSubcommand();
  const key = interaction.options.getString('key');
  const store = loadKV();
  if (sub === 'get') {
    const v = Object.prototype.hasOwnProperty.call(store, key) ? store[key] : '(not set)';
    await interaction.reply(`**${key}** = ${v}`);
  } else if (sub === 'set') {
    const value = interaction.options.getString('value', true);
    store[key] = value;
    saveKV(store);
    await interaction.reply(`Saved **${key}**.`);
  } else if (sub === 'del') {
    delete store[key];
    saveKV(store);
    await interaction.reply(`Deleted **${key}**.`);
  }
}