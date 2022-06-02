module.exports = {
  name: "list",
  description: "List all commands",
  execute(message, args) {
    const commandList = [];
    const commandMap = message.client.commands.map((command) => command.name);
    commandMap.forEach((command) => {
      commandList.push(command);
    });
    message.channel.send(`\`\`\`${commandList.join("\n")}\`\`\``);
  },
};
