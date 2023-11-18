const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays music from a local file'),
	async execute(interaction) {
		const member = interaction.member;
		const voiceChannel = member.voice.channel;

		if (!voiceChannel) {
			await interaction.reply('You need to be in a voice channel to use this command!');
			return;
		}
		const player = createAudioPlayer();
		const resource = createAudioResource('https://stream.radios.rs:9038/;*.mp3', {
        inlineVolume: true
    });
		joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		}).subscribe(player);
		// message.guild.me.voice.setRequestToSpeak(true);
		// Create an audio player and play the local audio file
		
		player.play(resource);

		await interaction.reply('Playing the local audio file!');
	},
};
