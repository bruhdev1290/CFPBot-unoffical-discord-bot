import { SlashCommandBuilder } from 'discord.js';
export const data = new SlashCommandBuilder()
  .setName('standup')
  .setDescription('Post a standup update (mirrored to a configured channel).')
  .addStringOption(o=>o.setName('text').setDescription('Your standup text').setRequired(true));
export async function execute(interaction) {
  const text = interaction.options.getString('text', true);
  const mirrorChannelId = process.env.STANDUP_CHANNEL_ID;
  await interaction.reply({ content: `Thanks! Logged your standup: "${text}"` });
  try {
    if (mirrorChannelId) {
      const ch = await interaction.client.channels.fetch(mirrorChannelId).catch(()=>null);
      if (ch && ch.isTextBased()) {
        await ch.send(`**${interaction.user.tag}** standup: ${text}`);
      }
    }
  } catch {}
}