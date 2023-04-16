import { DisTube } from "distube";
import { Client } from "discord.js"

export default function setUpDistube(distube: DisTube, client: Client) {
  distube.on("addSong", (queue, song) => {
    console.log("songAdded");
  })
}
