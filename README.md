# Radio playing bot
## Discord bot that gets audio from a radio and plays it in your voice channel
### Not hosted anywhere because it is not exactly very budget friendly as it uses a lot of memory, I host it on my pc when I play with my friends

## How to run
1. Run this by downloading or cloning the repo to your local environment
2. Run `npm install` to install prerequisites   
3. Add a .env file with TOKEN variable with your bot ID as value
4. Run `npm start` to start the server

## How to use
1. You need to create your own bot in discord developer portal, edit the permissions to allow for voice and speech and invite to a server
2. There is only one command at the moment, that is /play, you will need to run `node deploy-commands.js` from root directory to publish it
3. If you want to create a new command, just add a new js file in commands directory and hit `node deploy-commands.js` to update
4. To add a new radio station to the existing play command, just add a new object with name and value properties to the radios array
5. **The value property needs to be a link to an _mp3_ file or it won't work**
6. Look for a `src`` attribute on an `<audio></audio>` tag to find it
7. That's it, **have fun!**