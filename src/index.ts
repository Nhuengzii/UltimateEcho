import Discord from "discord.js";
import { DisTube } from "distube";
import setUpDistube from "./distube-setup.js";
import SetupMessageCommandHandler from "./messageCommandHandler.js";

const client = new Discord.Client({
  intents: ["Guilds", "GuildVoiceStates", "GuildMessages", "MessageContent"],
});

const prefix = "-";

const distube = new DisTube(client, {
  searchSongs: 5,
  searchCooldown: 10,
  leaveOnEmpty: false,
  leaveOnFinish: false,
  leaveOnStop: false,
});
SetupMessageCommandHandler(client, distube, prefix);
setUpDistube(distube, client);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});


const TOKEN = process.env.TOKEN;
client.login(TOKEN);
