import { SlashCommandBuilder } from 'discord.js';

function safeEval(expr) {
  // allow digits, spaces, + - * / % . ( ) and ^ for power (convert to **)
  const cleaned = expr.replace(/\s+/g,'').replace(/\^/g,'**');
  if (!/^[0-9+\-*/%.()**]+$/.test(cleaned)) throw new Error('Invalid characters');
  // further sanity: disallow consecutive risky sequences
  // eslint-disable-next-line no-new-func
  return Function(`'use strict'; return (${cleaned});`)();
}

export const data = new SlashCommandBuilder()
  .setName('math')
  .setDescription('Evaluate a basic arithmetic expression.')
  .addStringOption(o=>o.setName('expr').setDescription('Expression, e.g., (2+3)*4/5').setRequired(true));

export async function execute(interaction) {
  const expr = interaction.options.getString('expr', true);
  try {
    const val = safeEval(expr);
    await interaction.reply(`\`${expr}\` = **${val}**`);
  } catch (e) {
    await interaction.reply({ ephemeral: true, content: `Could not evaluate expression. Allowed: numbers and + - * / % ( ) ^ .` });
  }
}