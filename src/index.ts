import Discord from "discord.js";
import { DisTube } from "distube";

const client = new Discord.Client({
  intents: ["Guilds", "GuildVoiceStates", "GuildMessages"],
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

const TOKEN = process.env.TOKEN;
client.login(TOKEN);
