const Discord = require("discord.js")
const functions = require("./functions.js")


module.exports = {
  Function: async function(client, answer, message) {
        message.reply(answer.response);
        functions.Inform(client, answer, message);
  }
};