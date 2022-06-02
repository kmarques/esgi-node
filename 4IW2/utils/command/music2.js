// command discord to listen to the music on youtube
module.exports = {
  name: "music2",
  description: "Listen to music on youtube",
  execute(message, args) {
    if (!message.member.voiceChannel)
      return message.channel.send(
        "You must be in a voice channel to use this command."
      );
    if (!args[0])
      return message.channel.send(
        "You must provide a link to a youtube video."
      );
    if (message.guild.voiceConnection)
      return message.channel.send("I am already connected to a voice channel.");
    message.member.voiceChannel.join().then((connection) => {
      const stream = ytdl(args[0], { filter: "audioonly" });
      const dispatcher = connection.playStream(stream);
      dispatcher.on("end", () => {
        message.member.voiceChannel.leave();
      });
    });
  },
};
