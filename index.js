const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

const client = new Client();
const app = express();

// Prosty serwer HTTP, żeby Render nie wyłączał aplikacji
app.get('/', (req, res) => res.send('Bot działa!'));
app.listen(process.env.PORT || 3000);

client.on('ready', async () => {
  console.log(`Zalogowano jako ${client.user.tag}`);

  const getPresence = () => ({
    name: "Visual Studio Code",
    type: "PLAYING",
    details: "Editing index.js",
    state: "Workspace: main",
    timestamps: { start: Date.now() },
    assets: {
      large_image: "vscode", 
      large_text: "Visual Studio Code"
    }
  });

  client.user.setPresence({
    activities: [getPresence()],
    status: 'online'
  });
});

client.login(process.env.DISCORD_TOKEN);
