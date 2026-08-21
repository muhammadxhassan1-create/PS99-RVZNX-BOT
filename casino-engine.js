const { REST, Routes, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

const commands = [
    // /balance command
    new SlashCommandBuilder()
        .setName('balance')
        .setDescription('💰 Check your available wallet, profit, total wagered, and transfer logs'),

    // /deposit command (Admin Restricted)
    new SlashCommandBuilder()
        .setName('deposit')
        .setDescription('📥 Credit gems directly into a player profile balance')
        .addUserOption(opt => opt.setName('player').setDescription('The target player').setRequired(true))
        .addIntegerOption(opt => opt.setName('gems').setDescription('Amount of gems to deposit').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    // /withdraw command (Admin Restricted)
    new SlashCommandBuilder()
        .setName('withdraw')
        .setDescription('📤 Deduct gems directly out of a player profile balance')
        .addUserOption(opt => opt.setName('player').setDescription('The target player').setRequired(true))
        .addIntegerOption(opt => opt.setName('gems').setDescription('Amount of gems to withdraw').setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    // /coinflip command
    new SlashCommandBuilder()
        .setName('coinflip')
        .setDescription('🎰 Play a fair-odds coinflip game with your wallet balance')
        .addIntegerOption(opt => opt.setName('gems').setDescription('Amount of gems to wager').setRequired(true))
        .addStringOption(opt => 
            opt.setName('side').setDescription('Select your prediction target').setRequired(true)
               .addChoices({ name: '🟡 Heads', value: 'heads' }, { name: '⚪ Tails', value: 'tails' })),

    // /jackpot command
    new SlashCommandBuilder()
        .setName('jackpot')
        .setDescription('🎡 Spin the premium jackpot wheel under verified active odds')
        .addIntegerOption(opt => opt.setName('gems').setDescription('Amount of gems to wager').setRequired(true)),

    // /dice command
    new SlashCommandBuilder()
        .setName('dice')
        .setDescription('🎲 Roll high dice against the house using native live calculations')
        .addIntegerOption(opt => opt.setName('gems').setDescription('Amount of gems to wager').setRequired(true))
].map(cmd => cmd.toJSON());

const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN);

(async () => {
    try {
        console.log('🔄 Syncing comprehensive statistics slash layout menus...');
        await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), { body: commands });
        console.log('✅ Advanced Casino structures linked globally!');
    } catch (error) {
        console.error('❌ Deployment Error:', error);
    }
})();
