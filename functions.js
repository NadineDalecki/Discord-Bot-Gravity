const Discord = require("discord.js");
const dialogflow = require("@google-cloud/dialogflow");
const RolesList = require("./info/reaction-roles.json");
const fs = require("fs");

module.exports = {
  Command: function(client, message, Prefix) {
    client.commands = new Discord.Collection();
    const commandFiles = fs
      .readdirSync("./commands")
      .filter(file => file.endsWith(".js"));
    for (const file of commandFiles) {
      const command = require(`./commands/${file}`);
      client.commands.set(command.name, command);
    }
    const args = message.content.slice(Prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    if (!client.commands.has(command)) return;
    try {
      if (command != "") {
        client.commands.get(command).execute(message, args);
      }
    } catch (error) {
      console.error(error);
    }
  },
  DeletedMessage: async function(client, message) {
    const entry = await message.guild
      .fetchAuditLogs({ type: "MESSAGE_DELETE" })
      .then(audit => audit.entries.first());
    let user = "";
    try {
      if (
        entry.extra.channel.id === message.channel.id &&
        entry.target.id === message.author.id &&
        entry.createdTimestamp > Date.now() - 5000 &&
        entry.extra.count >= 1
      ) {
        user = entry.executor.username;
      } else {
        user = message.author.username;
      }

      const embed = new Discord.MessageEmbed()
        .setColor("#c20000")
        .setAuthor(
          `${user} deleted a message from ${message.author.username} in #${message.channel.name}`,
          user.displayAvatarURL()
        )
        .setDescription(`${message.content}`);

      client.channels.cache.get(process.env.LOG).send(embed);
    } catch (error) {
      console.log(error)
    }
  },
  DialogflowQuery: async function(message, query) {
    const config = {
      credentials: {
        private_key: process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
        client_email: process.env.CLIENT_EMAIL
      }
    };

    const sessionClient = new dialogflow.SessionsClient(config);
    const sessionPath = sessionClient.projectAgentSessionPath(
      process.env.PROJECT_ID,
      message.author.id
    );

    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: query,
          languageCode: "en-US"
        }
      }
    };

    const result = await sessionClient.detectIntent(request);
    const intent = result[0].queryResult.intent.displayName;
    const response = result[0].queryResult.fulfillmentText;
    return { result, intent, response };
  },
  Error: function(client, error) {
   const embed = new Discord.MessageEmbed()
        .setColor("#c70000")
        .setAuthor("ERROR", "https://cdn.discordapp.com/attachments/717442783794692097/733268935310442556/Untitled-1.png")
        .setDescription(error.stack);
    client.users.cache.get(process.env.OWNER).send(embed);
    console.error(error);
  },
  Inform: function(client, answer, message) {
    if (message.guild === null) {
      const embed = new Discord.MessageEmbed()
        .setColor("#ff930f")
        .setAuthor(
          `${message.author.tag} in DM`,
          message.author.displayAvatarURL()
        )
        .setDescription(
          `**${message.author.username}:** ${message}\n**Bot:** ${answer.response}`
        );

      client.users.cache.get(process.env.OWNER).send(embed);
    } else {
      const embed = new Discord.MessageEmbed()
        .setColor("#ff930f")
        .setAuthor(
          `${message.author.tag} in ${message.channel.name}`,
          message.author.displayAvatarURL()
        )
        .setDescription(
          `**${message.author.username}:** [${message}](${message.url})\n**Bot:** ${answer.response}`
        );

      client.users.cache.get(process.env.OWNER).send(embed);
    }
  },
  Mention: function(client, message, id) {
    const embed = new Discord.MessageEmbed()
      .setColor("#00c22a")
      .setAuthor(
        `${message.author.username} mentioned you in ${message.channel.name}`,
        message.author.displayAvatarURL()
      )
      .setDescription(`${message} \n [Link](${message.url})`);

    client.users.cache.get(id).send(embed);
  },
  RoleAdd: async function(reaction, user, id) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.log(error);
        return;
      }
    }
    const emojiId = reaction.emoji.id.toString();
    if (!user.bot && reaction.message.id === id) {
      if (
        RolesList.hasOwnProperty(emojiId) ||
        RolesList.hasOwnProperty(reaction.emoji.name)
      ) {
        if (emojiId == "748629381446107136"){
          await reaction.message.guild.member(user).roles.add("748518111086379029")
          await reaction.message.guild.member(user).roles.add("748518167105634368")
          await reaction.message.guild.member(user).roles.add("748518189868122142")
          await reaction.message.guild.member(user).roles.add("748518215520485407")
          await reaction.message.guild.member(user).roles.add("748518241911177307")
          await reaction.message.guild.member(user).roles.add("651255027469516801")
        }
        else {
        reaction.message.guild.member(user).roles.add(RolesList[emojiId].role);
        reaction.message.guild.member(user).roles.add("651255027469516801")
        }
      }
    }
  },
  RoleRemove: async function(reaction, user, id) {
    if (reaction.partial) {
      try {
        await reaction.fetch();
      } catch (error) {
        console.log(error);
        return;
      }
    }
    const emojiId = reaction.emoji.id.toString();
    if (!user.bot && reaction.message.id === id) {
      if (
        RolesList.hasOwnProperty(emojiId) ||
        RolesList.hasOwnProperty(reaction.emoji.name)
      ) {
        if (emojiId == "748629381446107136"){
          await reaction.message.guild.member(user).roles.remove("748518111086379029")
          await reaction.message.guild.member(user).roles.remove("748518167105634368")
          await reaction.message.guild.member(user).roles.remove("748518189868122142")
          await reaction.message.guild.member(user).roles.remove("748518215520485407")
          await reaction.message.guild.member(user).roles.remove("748518241911177307")
          await reaction.message.guild.member(user).roles.remove("651255027469516801")
        }
        else {
        reaction.message.guild.member(user).roles.remove(RolesList[emojiId].role);
        reaction.message.guild.member(user).roles.remove("651255027469516801")
        }
      }
    }
  }
};
