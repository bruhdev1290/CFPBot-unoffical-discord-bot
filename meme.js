import { SlashCommandBuilder } from 'discord.js';
function slugify(s) {
  return s.replace(/\s+/g,'_').replace(/\//g,'~s').replace(/\?/g,'~q').replace(/%/g,'~p').replace(/#/g,'~h');
}
export const data = new SlashCommandBuilder()
  .setName('meme')
  .setDescription('Create a meme URL using memegen.link')
  .addStringOption(o=>o.setName('template').setDescription('Template id (e.g., drake, doge, buzz) – see https://memegen.link/templates').setRequired(true))
  .addStringOption(o=>o.setName('top').setDescription('Top text').setRequired(false))
  .addStringOption(o=>o.setName('bottom').setDescription('Bottom text').setRequired(false));
export async function execute(interaction) {
  const t = interaction.options.getString('template', true);
  const top = slugify(interaction.options.getString('top') || '_');
  const bottom = slugify(interaction.options.getString('bottom') || '_');
  const url = `https://api.memegen.link/images/${encodeURIComponent(t)}/${top}/${bottom}.png`;
  await interaction.reply(`Meme: <${url}>`);
}