import { SlashCommandBuilder } from 'discord.js';
const ideas = [
  '☕ Take a 5-minute coffee/tea break.',
  '🚶 Walk around the block and get fresh air.',
  '🎧 Play your favorite track.',
  '🍫 Grab a small treat. You earned it.',
  '📚 Read a page from a book.',
];
export const data = new SlashCommandBuilder().setName('treat').setDescription('Treat yo self.');
export async function execute(interaction) {
  const pick = ideas[Math.floor(Math.random()*ideas.length)];
  await interaction.reply(pick);
}