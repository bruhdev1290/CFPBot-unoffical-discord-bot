import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
  .setName('help')
  .setDescription('Show available commands.');
export async function execute(interaction) {
  await interaction.reply({
    ephemeral: true,
    content: [
      '**CFPBot (Discord) – Commands**',
      '/help – this help',
      '/rules – show community rules',
      '/highfive user:<@user> – send a high five',
      '/standup text:<message> – post a standup update (mirrored to configured channel)',
      '/searchcfgov query:<text> – search consumerfinance.gov',
      '/maps query:<text> – Google Maps search link',
      '/math expr:<expression> – evaluate basic arithmetic',
      '/meme template:<id> top:<text> bottom:<text> – generate a memegen.link image URL',
      '/translate text:<text> lang:<code> – Google Translate link (auto→lang)',
      '/youtube query:<text> – YouTube search link',
      '/treat – Get a delightful suggestion',
      '/kv get|set|del – simple key-value storage'
    ].join('\n')
  });
}