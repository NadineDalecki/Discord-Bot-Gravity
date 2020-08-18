/*╔═══════════════════════════════════════╗
    ALL BOTS
  ╚═══════════════════════════════════════╝*/
const Discord = require("discord.js")
const Prefix = "!"
const client = new Discord.Client({ partials: ["MESSAGE", "CHANNEL", "REACTION"] })
const functions = require("./functions.js")
const df = require("./dialogflow-functions.js")

process.on("error", error => functions.Error(client, error))
process.on("uncaughtException", error => functions.Error(client, error))
process.on("unhandledRejection", error => functions.Error(client, error))

client.once("ready", () => {client.user.setActivity("Ducky 👀", {url: "https://www.twitch.tv",type:"WATCHING"});console.log("Ready!");});
client.on("error", error => functions.Error(client, error))
client.on("messageReactionAdd", async (reaction, user) => {
	functions.RoleAdd(reaction, user, "726851201441726485")
})
client.on("messageReactionRemove", async (reaction, user) => {
	functions.RoleRemove(reaction, user, "726851201441726485")
})

client.login(process.env.BOT)

const express = require("express")
const app = express()
app.get("/", (request, response) => {
	response.sendStatus(200)
})
app.listen()

/*╔═══════════════════════════════════════╗
    Dialogflow
  ╚═══════════════════════════════════════╝*/

client.on("message", async message => {
 if (!message.author.bot && message.cleanContent.length <= 256) {
    if (
      message.channel.type == "dm" &&
      client.user.id != message.author.id &&
      !message.content.startsWith(Prefix)
    ) {
      const df = require("./dialogflow-functions.js");
      const answer = await functions.DialogflowQuery(
        message,
        message.cleanContent
      );
      df.Function(client, answer, message);
    } else if (
      (message.cleanContent.startsWith("@" + client.user.username + " ") ||
        message.cleanContent.startsWith(client.user.username + " ") ||
        message.cleanContent.startsWith(
          client.user.username.toLowerCase() + " "
        )) &&
      client.user.id != message.author.id
    ) {
      const answer = await functions.DialogflowQuery(
        message,
        message.cleanContent
          .split(" ")
          .slice(1)
          .join(" ")
      );
        df.Function(client, answer, message);
    } 
/*╔═══════════════════════════════════════╗
    Commands
  ╚═══════════════════════════════════════╝*/
    else if (!message.content.startsWith(Prefix) || message.author.bot) return;
    functions.Command(client, message, Prefix);
}});



