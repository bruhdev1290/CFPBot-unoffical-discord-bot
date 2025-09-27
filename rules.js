import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder().setName('rules').setDescription('Show community rules.');
export async function execute(interaction) {
  await interaction.reply('Be kind, be respectful, keep PII out of chats, follow Discord TOS and team policies.');
}