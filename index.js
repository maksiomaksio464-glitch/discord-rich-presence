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
      // Link do zewnętrznego logo Pythona (duże)
      large_image: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/python/python.png",
      large_text: "Python",
      
      // Link do zewnętrznego logo VS Code (małe)
      small_image: "https://raw.githubusercontent.com/github/explore/80688e429a7d4ef2fca1e82350fe8e3517d3494d/topics/visual-studio-code/visual-studio-code.png",
      small_text: "Visual Studio Code" // <-- To pojawi się w chmurce po najechaniu!
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

client.login(process.env.DISCORD_TOKEN);
