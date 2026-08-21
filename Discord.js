const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// System Engine: True 70% Hard Loss Check with Hidden RNG Layout
function evaluateGameOutcome() {
    const overallRoll = Math.floor(Math.random() * 100) + 1;
    
    if (overallRoll <= 70) {
        // Absolute Loss: Create a visual display percentage ranging from 1% to 49%
        const displayChance = Math.floor(Math.random() * 49) + 1;
        return { isWin: false, chance: displayChance };
    } else {
        // Absolute Win: Create a visual display percentage ranging from 50% to 99%
        const displayChance = Math.floor(Math.random() * 50) + 50;
        return { isWin: true, chance: displayChance };
    }
}

client.once('ready', () => {
    console.log(`🤖 PS99 Bet Clone UI Engine is active as: ${client.user.tag}`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    const args = message.content.split(' ');
    const command = args[0].toLowerCase();

    // Usage: !coinflip [amount] [heads/tails]
    if (command === '!coinflip') {
        const betAmount = parseInt(args[1]);
        const choice = args[2]?.toLowerCase();

        if (!betAmount || isNaN(betAmount) || !['heads', 'tails'].includes(choice)) {
            return message.reply('⚠ **Usage Pattern:** `!coinflip <amount> <heads/tails>`');
        }

        // Calculate background math
        const outcome = evaluateGameOutcome();
        const finalMultiplier = 2.0;
        const potentialPayout = betAmount * finalMultiplier;

        // Build premium UI layout matching image branding themes
        const uiEmbed = new EmbedBuilder()
            .setAuthor({ name: 'PS99BET | Coinflip Game', iconURL: client.user.displayAvatarURL() })
            .setThumbnail('https://imgur.com') // Replace with a valid image URL if desired
            .addFields(
                { name: '👤 Player Username', value: `<@${message.author.id}>`, inline: true },
                { name: '🎲 Wager Amount', value: `💎 ${betAmount.toLocaleString()} Gems`, inline: true },
                { name: '🪙 Chosen Side', value: `\`${choice.toUpperCase()}\``, inline: true },
                { name: '⚙ Current System Odds', value: `📈 \`${outcome.chance}%\` Win Probability`, inline: false }
            )
            .setTimestamp()
            .setFooter({ text: '⚡ Operational Integrity Secure • PS99 Casino Ecosystem' });

        if (outcome.isWin) {
            uiEmbed.setColor('#00FF7F') // Safe Vibrant Green for wins
                   .setTitle('🎉 CONGRATULATIONS! YOU WON!')
                   .setDescription(`The coin spun and matched your prediction flawlessly! Your balance grew exponentially.`);
            
            uiEmbed.addFields({ name: '💰 Total Earnings Sent', value: `💎 **+${potentialPayout.toLocaleString()} Gems**`, inline: false });
        } else {
            uiEmbed.setColor('#FF3B30') // Bright Warning Red for losses
                   .setTitle('❌ BETTER LUCK NEXT TIME!')
                   .setDescription(`The coin flipped over to the opposite side. Your wager has been swept to the platform house pool.`);
            
            uiEmbed.addFields({ name: '📉 Total Deficit Balance', value: `💎 **-${betAmount.toLocaleString()} Gems**`, inline: false });
        }

        // Send UI embed directly to channel
        return message.channel.send({ embeds: [uiEmbed] });
    }
});

// Provide private secure authentication key
client.login('YOUR_DISCORD_BOT_TOKEN_HERE');
