import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
  .setName('maps')
  .setDescription('Google Maps search link.')
  .addStringOption(o=>o.setName('query').setDescription('Place or address').setRequired(true));
export async function execute(interaction) {
  const q = interaction.options.getString('query', true);
  const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(q)}`;
  await interaction.reply(`Map: <${url}>`);
}