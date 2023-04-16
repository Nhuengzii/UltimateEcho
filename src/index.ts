import Discord from "discord.js";
import { DisTube } from "distube";
import setUpDistube from "./distube-setup.js";

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
setUpDistube(distube, client);

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot || !message.inGuild()) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift();

  if (["play", "p"].includes(command)) {
    const voiceChannel = message.member?.voice?.channel;
    if (voiceChannel) {
      distube.play(voiceChannel, args.join(" ")),
      {
        message,
        textChannel: message.channel,
        member: message.member,
      };
    } else {
      message.channel.send("You need to be in a voice channel to play music!");
    }
  } else if (["leave", "l"].includes(command)) {
    distube.voices.get(message)?.leave();
    message.channel.send("Leaving the voice channel!");
  }
});

const TOKEN = process.env.TOKEN;
client.login(TOKEN);
