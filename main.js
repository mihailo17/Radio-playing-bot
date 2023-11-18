// Require the necessary discord.js classes
const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('path');
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates] });
client.commands = new Collection();


let commands = [];
// Grab all the command files from the commands directory you created earlier
const foldersPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(foldersPath);

for (const file of commandFiles) {
	// Grab all the command files from the commands directory you created earlier
	// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
		const filePath = path.join(foldersPath, file);
		const command = require(filePath);
		if ('data' in command && 'execute' in command) {
			commands.push(command.data.toJSON());
		} else {
			console.log(`nothing`);
		}
}
// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
client.once(Events.ClientReady, c => {
	console.log(`Ready! Logged in as ${c.user.tag}`);
});



client.on(Events.InteractionCreate, async interaction => {
	console.log("pozvan")
	if (!interaction.isChatInputCommand()) return;
	const commandName = interaction.commandName;
	const command = commands.find(cmd => cmd.name === commandName);
	
	if (!command) {
	  console.error(`No command matching ${interaction.commandName} was found.`);
	  return;
	}
	
	try {
	  const commandFilePath = path.join(foldersPath, `${commandName}.js`);
	  const commandFile = require(commandFilePath);
	  await commandFile.execute(interaction);
	} catch (error) {
	  console.error(error);
	  await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

// Log in to Discord with your client's token
client.login(token);