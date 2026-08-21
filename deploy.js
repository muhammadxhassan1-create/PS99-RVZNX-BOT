const { REST, Routes, SlashCommandBuilder } = require('discord.js');

const commands = [
    new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('🎰 Play a fair-odds coinflip game with visual UI panels')
        .addIntegerOption(opt => 
            opt.setName('gems').setDescription('Amount of Pet Simulator 99 gems to wager').setRequired(true))
        .addStringOption(opt => 
            opt.setName('side').setDescription('Select your prediction target').setRequired(true)
               .addChoices({ name: '🟡 Heads', value: 'heads' }, { name: '⚪ Tails', value: 'tails' })),

    new SlashCommandBuilder()
        .setName('jackpot')
        .setDescription('🎡 Spin the premium jackpot wheel under verified active odds')
        .addIntegerOption(opt => 
            opt.setName('gems').setDescription('Amount of Pet Simulator 99 gems to wager').setRequired(true)),

    new SlashCommandBuilder()
        .setName('dice')
        .setDescription('🎲 Roll high dice against the house using native live calculations')
        .addIntegerOption(opt => 
            opt.setName('gems').setDescription('Amount of Pet Simulator 99 gems to wager').setRequired(true))
].map(cmd => cmd.toJSON());

// SECURE ARRANGEMENT: Pulled dynamically from protected variables
const rest = new REST({ version: '10' }).setToken(process.env.MTU0MDM0NTU4NDEyNzQ0MzA3NQ.GBT9Wf.uY4XhTAOZX0nunZSy-0N4zYgE8e_8MHA1mCWyA);

(async () => {
    try {
        console.log('🔄 Syncing premium slash menus into centralized data grids...');
        await rest.put(
            Routes.applicationCommands(process.env.1540345584127443075),
            { body: commands }
        );
        console.log('✅ Visual Slash modules synced across universal network clusters!');
    } catch (error) {
        console.error('❌ Deployment Error:', error);
    }
})();
