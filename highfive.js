import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
  .setName('highfive')
  .setDescription('Give a high five.')
  .addUserOption(o=>o.setName('user').setDescription('User to high-five').setRequired(true));
export async function execute(interaction) {
  const user = interaction.options.getUser('user', true);
  await interaction.reply(`\u270B High five, ${user}!`);
}