const { SlashCommandBuilder } = require('discord.js');
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');

const radios = {
	juzni: "https://stream.radios.rs:9038/;*.mp3",
	80: "https://naxidigital-80s128ssl.streaming.rs:8042/;*.mp3",
	TDI: "https://streaming.tdiradio.com/tdiradio.mp3",
}

module.exports = {
	data: new SlashCommandBuilder()
		.setName('play')
		.setDescription('Plays music from a radio')
		.addStringOption(option =>
			option.setName('station')
				.setDescription('Select a radio station')
				.setRequired(true)
				.addChoices({name: 'Juzni', value: 'juzni'}, {name: '80s', value: '80'}, {name: 'TDI', value: 'TDI'})
		),
	async execute(interaction) {
		const member = interaction.member;
		const voiceChannel = member.voice.channel;

		if (!voiceChannel) {
			await interaction.reply('You need to be in a voice channel to use this command!');
			return;
		}
		
		const station = interaction.options.getString('station');

		const radioUrl = radios[station];
		if (!radioUrl) {
			await interaction.reply('Invalid radio station!');
			return;
		}

		const player = createAudioPlayer();
		const resource = createAudioResource(radioUrl, {
			inlineVolume: true
		});

		joinVoiceChannel({
			channelId: voiceChannel.id,
			guildId: voiceChannel.guild.id,
			adapterCreator: interaction.guild.voiceAdapterCreator,
		}).subscribe(player);

		player.play(resource);

		await interaction.reply(`Playing radio station: ${station}`);
		},
		};
