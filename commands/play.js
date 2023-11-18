const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');
const { clientId, guildId } = require('../config.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const member = interaction.member;
		const voiceChannel = member.voice.channel;

		if (voiceChannel) {
			await joinVoiceChannel({
				channelId: voiceChannel.id,
				guildId: guildId,
				adapterCreator: interaction.guild.voiceAdapterCreator,
			});
			await interaction.reply('Joined the voice channel!');
		} else {
			await interaction.reply('You need to be in a voice channel to use this command!');
		}
	},
};