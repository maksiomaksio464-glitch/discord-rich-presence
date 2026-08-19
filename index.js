const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

const client = new Client();
const app = express();

app.get('/', (req, res) => res.send('Bot działa!'));
app.listen(process.env.PORT || 3000);

client.on('error', (err) => {
  console.error('Wystąpił błąd klienta Discorda:', err.message);
});

process.on('unhandledRejection', (reason) => {
  console.error('Niewychwycony błąd:', reason);
});

client.on('ready', async () => {
  console.log(`Zalogowano jako ${client.user.tag}`);

  const getPresence = () => ({
    name: "Visual Studio Code",
    type: "PLAYING",
    details: "Editing ticket.py",
    state: "Workspace: bot pod rp",
    timestamps: { start: Date.now() },
    // Użycie ID oficjalnej aplikacji VS Code rozwiązuje problem INVALID_URL
    applicationId: "383226320970055681", 
    assets: {
      large_image: "python",               // Domyślny asset dla Pythona w VS Code
      large_text: "Python",
      small_image: "vscode",               // Domyślny asset dla logo VS Code
      small_text: "Visual Studio Code"     // Napis w chmurce po najechaniu!
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

if (!process.env.DISCORD_TOKEN) {
  console.error("BŁĄD: Brak zmiennej DISCORD_TOKEN w Environment Variables!");
} else {
  client.login(process.env.DISCORD_TOKEN).catch((err) => {
    console.error("Nie udało się zalogować. Prawdopodobnie zły token:", err.message);
  });
}
