const { Client, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const path = require('path');

const client = new Client({ intents: [] }); 
const dbPath = path.join(__dirname, 'casino_profiles.json');

// --- ADVANCED PROFILE STORAGE INTERACTION ---
function loadProfiles() {
    if (!fs.existsSync(dbPath)) {
        fs.writeFileSync(dbPath, JSON.stringify({}));
        return {};
    }
    try {
        return JSON.parse(fs.readFileSync(dbPath, 'utf8'));
    } catch (e) {
        return {};
    }
}

function saveProfiles(data) {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

function getProfile(userId) {
    const db = loadProfiles();
    if (!db[userId]) {
        db[userId] = {
            balance: 0,
            profit: 0,
            wagered: 0,
            deposited: 0,
            withdrawn: 0
        };
        saveProfiles(db);
    }
    return db[userId];
}

function updateProfileMetrics(userId, updates) {
    const db = loadProfiles();
    if (!db[userId]) {
        db[userId] = { balance: 0, profit: 0, wagered: 0, deposited: 0, withdrawn: 0 };
    }
    
    if (updates.balance !== undefined) db[userId].balance += updates.balance;
    if (updates.profit !== undefined) db[userId].profit += updates.profit;
    if (updates.wagered !== undefined) db[userId].wagered += updates.wagered;
    if (updates.deposited !== undefined) db[userId].deposited += updates.deposited;
    if (updates.withdrawn !== undefined) db[userId].withdrawn += updates.withdrawn;

    // Prevent floating storage corruptions or negative balance thresholds
    if (db[userId].balance < 0) db[userId].balance = 0;
    
    saveProfiles(db);
    return db[userId];
}

// --- FAIR GAME LOGIC ENGINE ---
function evaluateFairGameOutcome() {
    const randomWinChanceThreshold = Math.floor(Math.random() * 81) + 10; // 10% to 90%
    const playerRoll = Math.floor(Math.random() * 100) + 1;
    return { isWin: playerRoll <= randomWinChanceThreshold, chance: randomWinChanceThreshold };
}

client.once('ready', () => {
    console.log(`✨ PS99 Casino & Auditing Engine Active: ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName, options } = interaction;
    const platformIcon = client.user.displayAvatarURL() || 'https://imgur.com';

    // ==========================================
    // ACCOUNT COMMAND: /BALANCE
    // ==========================================
    if (commandName === 'balance') {
        const profile = getProfile(interaction.user.id);
        
        // Dynamic green color formatting for positive net results, crimson for negative
        const profitString = profile.profit >= 0 ? `🟢 +${profile.profit.toLocaleString()}` : `🔴 ${profile.profit.toLocaleString()}`;

        const balEmbed = new EmbedBuilder()
            .setColor('#1E90FF')
            .setAuthor({ name: 'PS99BET | Player Financial Overview', iconURL: platformIcon })
            .setThumbnail(platformIcon)
            .setDescription(`Statistical summary panel for <@${interaction.user.id}>`)
            .addFields(
                { name: '👛 Available Liquid Balance', value: `💎 \`${profile.balance.toLocaleString()}\` Gems`, inline: false },
                { name: '📈 Net Casino Profit', value: `\`${profitString}\` Gems`, inline: true },
                { name: '📊 Cumulative Wagered Volume', value: `💎 \`${profile.wagered.toLocaleString()}\` Gems`, inline: true },
                { name: '\u200B', value: '\u200B', inline: false }, // Separation line block
                { name: '📥 Total Cash Deposited', value: `💎 \`${profile.deposited.toLocaleString()}\` Gems`, inline: true },
                { name: '📤 Total Cash Withdrawn', value: `💎 \`${profile.withdrawn.toLocaleString()}\` Gems`, inline: true }
            )
            .setFooter({ text: '⚡ Operational Audit Ledger Safe' })
            .setTimestamp();

        return interaction.reply({ embeds: [balEmbed] });
    }

    // ==========================================
    // ADMIN ACTION: /DEPOSIT
    // ==========================================
    if (commandName === 'deposit') {
        const targetUser = options.getUser('player');
        const depositGems = options.getInteger('gems');

        if (depositGems <= 0) return interaction.reply({ content: '❌ Amount must be positive.', ephemeral: true });

        const updated = updateProfileMetrics(targetUser.id, { balance: depositGems, deposited: depositGems });

        const depEmbed = new EmbedBuilder()
            .setColor('#00FF7F')
            .setAuthor({ name: 'PS99BET | Deposit System Protocol', iconURL: platformIcon })
            .setDescription(`Successfully manually credited wallet account parameters for <@${targetUser.id}>.`)
            .addFields(
                { name: '📥 Value Added', value: `💎 **+${depositGems.toLocaleString()} Gems**`, inline: true },
                { name: '👛 Updated Total Balance', value: `💎 \`${updated.balance.toLocaleString()}\` Gems`, inline: true }
            )
            .setTimestamp();

        return interaction.reply({ embeds: [depEmbed] });
    }

    // ==========================================
    // ADMIN ACTION: /WITHDRAW
    // ==========================================
    if (commandName === 'withdraw') {
        const targetUser = options.getUser('player');
        const withdrawGems = options.getInteger('gems');

        if (withdrawGems <= 0) return interaction.reply({ content: '❌ Amount must be positive.', ephemeral: true });

        const targetProfile = getProfile(targetUser.id);
        if (targetProfile.balance < withdrawGems) {
            return interaction.reply({ content: `❌ User only has \`${targetProfile.balance.toLocaleString()}\` gems. Cannot withdraw \`${withdrawGems.toLocaleString()}\`.`, ephemeral: true });
        }

        const updated = updateProfileMetrics(targetUser.id, { balance: -withdrawGems, withdrawn: withdrawGems });

        const withEmbed = new EmbedBuilder()
            .setColor('#FF3B30')
            .setAuthor({ name: 'PS99BET | Withdrawal System Protocol', iconURL: platformIcon })
            .setDescription(`Successfully processed transaction payout verification for <@${targetUser.id}>.`)
            .addFields(
                { name: '📤 Value Extracted', value: `💎 **-${withdrawGems.toLocaleString()} Gems**`, inline: true },
                { name: '👛 Updated Remaining Balance', value: `💎 \`${updated.balance.toLocaleString()}\` Gems`, inline: true }
            )
            .setTimestamp();

        return interaction.reply({ embeds: [withEmbed] });
    }

    // --- UNIVERSAL GAME BALANCING VALIDATOR INTERCEPT ---
    const betValue = options.getInteger('gems');
    if (betValue) {
        if (betValue <= 0) {
            return interaction.reply({ content: '❌ **Transaction Denied:** Your gem wager must be greater than `0`.', ephemeral: true });
        }
        
        const profile = getProfile(interaction.user.id);
        if (profile.balance < betValue) {
            return interaction.reply({ 
                content: `❌ **Insufficient Funds:** You are attempting to wager \`${betValue.toLocaleString()}\` gems, but your ledger balance only contains \`${profile.balance.toLocaleString()}\` gems!`, 
                ephemeral: true 
            });
        }
    }

    const runCheck = evaluateFairGameOutcome();

    // ==========================================
    // GAME MODULE: /COINFLIP
    // ==========================================
    if (commandName === 'coinflip') {
        const sideSelection = options.getString('side');
        const sideEmoji = sideSelection === 'heads' ? '🟡' : '⚪';

        const uiEmbed = new EmbedBuilder()
            .setAuthor({ name: 'PS99BET | Coinflip Platform', iconURL: platformIcon })
            .addFields(
                { name: '👤 Player Account', value: `<@${interaction.user.id}>`, inline: true },
                { name: '💎 Total Wager', value: `\`${betValue.toLocaleString()}\` Gems`, inline: true },
                { name: '🪙 Prediction', value: `${sideEmoji} \`${sideSelection.toUpperCase()}\``, inline: true },
                { name: '📊 Operational Setup Odds', value: `✨ \`${runCheck.chance}%\` Win Probability`, inline: false }
            )
            .setTimestamp();

        if (runCheck.isWin) {
            const state = updateProfileMetrics(interaction.user.id, { balance: betValue, profit: betValue, wagered: betValue });
            uiEmbed.setColor('#00FF7F')
                .setTitle('🎉 SUCCESSFUL COINFLIP MATCH!')
                .addFields(
                    { name: '💰 Credited System Payout', value: `💎 **+${(betValue * 2).toLocaleString()} Gems**`, inline: true },
                    { name: '👛 Updated Net Balance', value: `💎 \`${state.balance.toLocaleString()}\` Gems`, inline: true }
                );
        } else {
            const state = updateProfileMetrics(interaction.user.id, { balance: -betValue, profit: -betValue, wagered: betValue });
            uiEmbed.setColor('#FF3B30')
                .setTitle('❌ TRANSACTION FAULT: LOSS')
                .addFields(
                    { name: '📉 Cleared Wager Capital', value: `💎 **-${betValue.toLocaleString()} Gems**`, inline: true },
                    { name: '👛 Updated Net Balance', value: `💎 \`${state.balance.toLocaleString()}\` Gems`, inline: true }
                );
        }
        return interaction.reply({ embeds: [uiEmbed] });
    }

    // ==========================================
    // GAME MODULE: /JACKPOT
    // ==========================================
    if (commandName === 'jackpot') {
        const uiEmbed = new EmbedBuilder()
            .setAuthor({ name: 'PS99BET | Jackpot Wheel Module', iconURL: platformIcon })
            .addFields(
