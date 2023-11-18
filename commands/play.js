const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { clientId, guildId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Replies with Pong!'),
		async execute(interaction) {
		await interaction.reply('Pong!');
	},
};