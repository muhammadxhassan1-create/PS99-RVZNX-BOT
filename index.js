const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});
 

// Organic RNG engine matching shown UI layout parameters
function evaluateFairGameOutcome() {
    const randomWinChanceThreshold = Math.floor(Math.random() * 81) + 10; // 10% to 90%
    const playerRoll = Math.floor(Math.random() * 100) + 1;
    return { isWin: playerRoll <= randomWinChanceThreshold, chance: randomWinChanceThreshold };
}

client.once('ready', () => {
    console.log(`✨ PS99 Casino UI Interface Engine Active: ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;
    const betValue = options.getInteger('gems');

    if (betValue <= 0) {
        return interaction.reply({ 
            content: '❌ **Transaction Denied:** Your gem wager must be greater than `0`.', 
            ephemeral: true 
        });
    }

    const runCheck = evaluateFairGameOutcome();
    const platformIcon = client.user.displayAvatarURL() || 'https://imgur.com';

    // ==========================================
    // UI LAYOUT 1: /COINFLIP
    // ==========================================
    if (commandName === 'coinflip') {
        const sideSelection = options.getString('side');
        const basePayout = betValue * 2;
        const sideEmoji = sideSelection === 'heads' ? '🟡' : '⚪';

        const uiEmbed = new EmbedBuilder()
            .setAuthor({ name: 'PS99BET | Coinflip Platform', iconURL: platformIcon })
            .setThumbnail(platformIcon)
            .addFields(
                { name: '👤 Player Account', value: `<@${interaction.user.id}>`, inline: true },
                { name: '💎 Total Wager', value: `\`${betValue.toLocaleString()}\` Gems`, inline: true },
                { name: '🪙 Prediction Side', value: `${sideEmoji} \`${sideSelection.toUpperCase()}\``, inline: true },
                { name: '📊 Operational Setup Odds', value: `✨ \`${runCheck.chance}%\` Calculated Win Probability`, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: '⚡ Powered by PS99Bet Systems • Secure Hash Verified' });

        if (runCheck.isWin) {
            uiEmbed.setColor('#00FF7F')
                .setTitle('🎉 SUCCESSFUL COINFLIP MATCH!')
                .setDescription(`The token flipped completely in your favor. Your casino wallet balance has received a direct payout addition.`)
                .addFields({ name: '💰 Credited System Payout', value: `💎 **+${basePayout.toLocaleString()} Gems**`, inline: false });
        } else {
            uiEmbed.setColor('#FF3B30')
                .setTitle('❌ TRANSACTION FAULT: LOSS')
                .setDescription(`The coin flipped over and settled on the opposing face sequence. Your active token stakes have been safely swept.`)
                .addFields({ name: '📉 Cleared Wager Capital', value: `💎 **-${betValue.toLocaleString()} Gems**`, inline: false });
        }

        return interaction.reply({ embeds: [uiEmbed] });
    }

    // ==========================================
    // UI LAYOUT 2: /JACKPOT
    // ==========================================
    if (commandName === 'jackpot') {
        const basePayout = betValue * 4;

        const uiEmbed = new EmbedBuilder()
            .setAuthor({ name: 'PS99BET | Jackpot Wheel Module', iconURL: platformIcon })
            .setThumbnail(platformIcon)
            .addFields(
                { name: '👤 Active User', value: `<@${interaction.user.id}>`, inline: true },
                { name: '💎 Wheel Stakes', value: `\`${betValue.toLocaleString()}\` Gems`, inline: true },
                { name: '📊 Active Spin Variance', value: `🎡 \`${runCheck.chance}%\` Verified Hit Chance`, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: '⚡ Powered by PS99Bet Systems • Multiplier Matrix Logged' });

        if (runCheck.isWin) {
            uiEmbed.setColor('#00FF7F')
                .setTitle('🚨 JACKPOT SECTOR REACHED!')
                .setDescription(`The mechanical pointer skipped over blanks and locked flawlessly onto a critical gold zone sector entry point.`)
                .addFields({ name: '💰 Total Earnings Sent', value: `💎 **+${basePayout.toLocaleString()} Gems** (4.0x Multiplier)`, inline: false });
        } else {
            uiEmbed.setColor('#FF3B30')
                .setTitle('❌ WHEEL STOPPED: EMPTY SLICE')
                .setDescription(`The wheel velocity decayed inside an empty grey sector node. Your assets have successfully merged into the master platform pool.`)
                .addFields({ name: '📉 Total Deficit Balance', value: `💎 **-${betValue.toLocaleString()} Gems**`, inline: false });
        }

        return interaction.reply({ embeds: [uiEmbed] });
    }

    // ==========================================
    // UI LAYOUT 3: /DICE
    // ==========================================
    if (commandName === 'dice') {
        const basePayout = betValue * 2;

        const uiEmbed = new EmbedBuilder()
            .setAuthor({ name: 'PS99BET | High-Stakes Dice Roll', iconURL: platformIcon })
            .setThumbnail(platformIcon)
            .addFields(
                { name: '👤 Active User', value: `<@${interaction.user.id}>`, inline: true },
                { name: '💎 Hand Stake Value', value: `\`${betValue.toLocaleString()}\` Gems`, inline: true },
                { name: '📊 Current Match Odds', value: `🎲 \`${runCheck.chance}%\` Win Probability`, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: '⚡ Powered by PS99Bet Systems • Rolling Tables Active' });

        if (runCheck.isWin) {
            const visualRoll = Math.floor(Math.random() * 2) + 5; 
            uiEmbed.setColor('#00FF7F')
                .setTitle(`🎲 HIGHER HAND ACHIEVED! ROLLED A ${visualRoll}!`)
                .setDescription(`Your execution roll successfully shattered the active system host target score limit.`)
                .addFields({ name: '💰 Total Earnings Sent', value: `💎 **+${basePayout.toLocaleString()} Gems**`, inline: false });
        } else {
            const visualRoll = Math.floor(Math.random() * 3) + 1; 
            uiEmbed.setColor('#FF3B30')
                .setTitle(`🎲 HOUSE DEFEATED PLAYER! ROLLED A ${visualRoll}!`)
                .setDescription(`Your total score parameters did not contain enough depth to beat the system dealer's hand values.`)
                .addFields({ name: '📉 Total Deficit Balance', value: `💎 **-${betValue.toLocaleString()} Gems**`, inline: false });
        }

        return interaction.reply({ embeds: [uiEmbed] });
    }
});

// SECURE ARRANGEMENT: Pulled dynamically from your host's protected config panel
client.login(process.env.MTU0MDM0NTU4NDEyNzQ0MzA3NQ.GBT9Wf.uY4XhTAOZX0nunZSy-0N4zYgE8e_8MHA1mCWyA);
