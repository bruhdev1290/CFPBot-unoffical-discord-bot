import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
  .setName('youtube')
  .setDescription('YouTube search link.')
  .addStringOption(o=>o.setName('query').setDescription('Search terms').setRequired(true));
export async function execute(interaction) {
  const q = interaction.options.getString('query', true);
  const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(q)}`;
  await interaction.reply(`YouTube: <${url}>`);
}