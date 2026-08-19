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
      // Oficjalne grafiki VS Code z Discorda:
      large_image: "mp:app-assets/383226320970055681/565945770067623946.png", // Grafika Python / VS Code
      large_text: "Python",
      small_image: "mp:app-assets/383226320970055681/565945770067623946.png", // Ikona VS Code
      small_text: "Visual Studio Code"
    }
  });

  client.user.setPresence({
    activities: [getPresence()],
    status: 'online'
  });

  // Automatyczne wyłącznie po 2 godzinach
  setTimeout(() => {
    console.log("Minęły 2 godziny. Wyłączam...");
    client.destroy();
    process.exit(0);
  }, 2 * 60 * 60 * 1000);
});

client.login(process.env.DISCORD_TOKEN);
