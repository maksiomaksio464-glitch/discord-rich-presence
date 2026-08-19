const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

const client = new Client();
const app = express();

app.get('/', (req, res) => res.send('Bot działa!'));
app.listen(process.env.PORT || 3000);

client.on('ready', async () => {
  console.log(`Zalogowano jako ${client.user.tag}`);

  const getPresence = () => ({
    name: "Visual Studio Code",
    type: "PLAYING",
    details: "Editing ticket.py",
    state: "Workspace: bot pod rp",
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

  // TUTAJ ZMIANA: Wyłącz bota i status automatycznie po 2 godzinach
  setTimeout(() => {
    console.log("Minęły 2 godziny. Wyłączam bota...");
    client.destroy(); // Rozłącza z Discordem
    process.exit(0);  // Zamyka skrypt
  }, 2 * 60 * 60 * 1000); // 2 godziny w milisekundach
});

client.login(process.env.DISCORD_TOKEN);
