import { Client } from "discord.js";
import { DisTube } from "distube";

export default function SetupMessageCommandHandler(client: Client, distube: DisTube, prefix: string = "-") {
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
}
