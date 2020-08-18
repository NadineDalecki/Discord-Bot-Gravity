const Discord = require('discord.js');
module.exports = {
  name: 'edit',
  execute(message, args) {
    if (message.member.hasPermission("ADMINISTRATOR")) {     
      message.channel.messages.fetch(args.shift())
        .then(newMessage => newMessage.edit(embed))
        .catch(console.error)
    }
  }
}