const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

const client = new Client();
const app = express();

app.get('/', (req, res) => res.send('Bot działa!'));
app.listen(process.env.PORT || 3000);

// OBSŁUGA BŁĘDÓW (zapobiega wywalaniu aplikacji na Renderze)
client.on('error', (err) => {
  console.error('Wystąpił błąd klienta Discorda:', err.message);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Niewychwycony błąd (Unhandled Rejection):', reason);
});

client.on('ready', async () => {
  console.log(`Zalogowano jako ${client.user.tag}`);

  const getPresence = () => ({
    name: "Visual Studio Code",
    type: "PLAYING",
    details: "Editing ticket.py",
    state: "Workspace: bot pod rp",
    timestamps: { start: Date.now() },
    assets: {
      large_image: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png",
      large_text: "Python",
      small_image: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png",
      small_text: "Visual Studio Code"
    }
  });

  client.user.setPresence({
    activities: [getPresence()],
    status: 'online'
  });

  setTimeout(() => {
    console.log("Minęły 2 godziny. Wyłączam bota...");
    client.destroy();
    process.exit(0);
  }, 2 * 60 * 60 * 1000);
});

// Logowanie z weryfikacją obecności tokena
if (!process.env.DISCORD_TOKEN) {
  console.error("BŁĄD: Brak zmiennej DISCORD_TOKEN w Environment Variables!");
} else {
  client.login(process.env.DISCORD_TOKEN).catch((err) => {
    console.error("Nie udało się zalogować. Prawdopodobnie zły token:", err.message);
  });
}
