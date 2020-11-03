/*╔═══════════════════════════════════════╗
    ALL BOTS
  ╚═══════════════════════════════════════╝*/
const Discord = require("discord.js");
const Prefix = "!";
const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});
const functions = require("./functions.js");
const df = require("./dialogflow-functions.js");

process.on("error", error => console.log(error));
process.on("uncaughtException", error => console.log(error));
process.on("unhandledRejection", error => console.log(error));

client.once("ready", () => {
  client.user.setActivity("Ducky 👀", {
    url: "https://www.twitch.tv",
    type: "WATCHING"
  });
  console.log("Ready!");
});
client.on("error", error => console.log(error));
client.on("messageReactionAdd", async (reaction, user) => {functions.RoleAdd(reaction, user, "749599176853028884")})
client.on("messageReactionRemove", async (reaction, user) => {functions.RoleRemove(reaction, user, "749599176853028884")})

client.login(process.env.BOT);

const express = require("express");
const app = express();
app.get("/", (request, response) => {
  response.sendStatus(200);
});
app.listen();

/*╔═══════════════════════════════════════╗
    Dialogflow
  ╚═══════════════════════════════════════╝*/

const WatchChannels = ["743091749282381845"];

client.on("message", async message => {
  if (
    WatchChannels.includes(message.channel.id) //&& message.author.bot
  ) try {
    
      if(message.cleanContent.includes("Live in 30 minutes here")){
      client.channels.cache.get("563355742393073674").send(message.content)
      client.channels.cache.get("748517746286919710").send(message.content)
      } 
      else if(message.cleanContent.includes("GOING LIVE!")){
      client.channels.cache.get("563355742393073674").send(message.content)
      client.channels.cache.get("748517746286919710").send(message.content)
      }
      else if(message.cleanContent.includes("has :eyes: on the match")){
        client.channels.cache.get("748517746286919710").send(message.content.split("<")[0] + "<" + message.content.split("<")[1]);
      }
      else if (message.cleanContent.includes("has been scheduled")){
        const messageA = message.content.split("<")[0] + "Viatrex" + message.content.split(">")[1]
        client.channels.cache.get("748517746286919710").send(messageA.split("<")[0]);
      }
      else if(message.cleanContent.includes("wins vs") || message.cleanContent.includes("loses vs")){
        client.channels.cache.get("748517746286919710").send(message.content.split("<")[0]);
      }
      else if(message.cleanContent.includes("Starts now!")){
        client.channels.cache.get("748517746286919710").send(message.content)
      }
    }
    catch (e) {
      console.log(e);
    }  

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
    } else if (!message.content.startsWith(Prefix) || message.author.bot)
    /*╔═══════════════════════════════════════╗
    Commands
  ╚═══════════════════════════════════════╝*/
      return;
    functions.Command(client, message, Prefix);
  }
});
