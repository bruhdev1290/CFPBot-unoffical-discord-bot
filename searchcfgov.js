import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
  .setName('searchcfgov')
  .setDescription('Search consumerfinance.gov for a query.')
  .addStringOption(o=>o.setName('query').setDescription('Search terms').setRequired(true));
export async function execute(interaction) {
  const q = interaction.options.getString('query', true);
  const url = `https://www.consumerfinance.gov/search/?q=${encodeURIComponent(q)}`;
  await interaction.reply(`Here you go: <${url}>`);
}