import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
  .setName('translate')
  .setDescription('Get a Google Translate link (auto-detect → target lang).')
  .addStringOption(o=>o.setName('text').setDescription('Text to translate').setRequired(true))
  .addStringOption(o=>o.setName('lang').setDescription('Target language code, e.g., en, es, fr').setRequired(true));
export async function execute(interaction) {
  const text = interaction.options.getString('text', true);
  const lang = interaction.options.getString('lang', true);
  const url = `https://translate.google.com/?sl=auto&tl=${encodeURIComponent(lang)}&text=${encodeURIComponent(text)}&op=translate`;
  await interaction.reply(`Translate: <${url}>`);
}