const { RichEmbed } = require("discord.js");
const Discord = require("discord.js");

const embed = new Discord.MessageEmbed()
  .setColor("#51c3e7")
   //.setAuthor("Welcome to the Virtex Stadium Discord server!")
  //.setTitle("Welcome to the Discord Server of Team Gravity!")
  //.setURL("https://virtexstadium.com")
  //.setThumbnail("https://i.imgur.com/Wlio7l2.png")
  .setDescription(
    "Stay up to date with the latest events and competitions and meet our teams! On the left you can find all of the channels, please join the ones you're interested in and have a great time!\n\u200b\n"
  )
  .addField(
    "RULES",
    "1. Use correct channels specific to your needs and region.\n2. Not tolerated: Spamming, name calling, harassing or threatening.\n3. Respect our staff and their decisions.\n4. Do not post links to malicious content.\n5. Do not advertise/promote content without permission.\n6. Impersonating others, especially staff or admins is not allowed.\n7. Our staff reserves the right to kick or ban a person.\n"
  )
.addField(
  "\u200b",
    "*For more info check <#469509206840705024> and <#563392406741975081> after selecting a role.* \n\u200b\n"
  )

.addField(
  "OUR TEAM",
    "<@&636249397205663764> \n<@221986262247145472> lives in his own timezone so be patient when asking him something. Otherwise a nice guy.\n\n<@&421641048155226113> \n<@338649491894829057> and <@102149885091921920> (the weird germans)  and <@216838050657861632> keep the server in order.\n\n <@&748528192909869192> \nOur players and team members, you can usually find them lurking around in their respective game channels!\n\u200b\n"
  )

/*  .addField(
    "HELPFUL LINKS",
    "[Website](https://www.teamgravityvr.com/)\n[Twitter](https://twitter.com/TeamGravityVR)\n\u200b\n",
    true
  )
  .addField(
    "\u200b",
    "[Instagram](https://www.instagram.com/teamgravityvr/)\n[Facebook](https://www.facebook.com/teamgravityvr)\n\u200B\n",
    true
  )
    .addField(
    "\u200b",
    "[Twitch](https://www.twitch.tv/teamgravityvr)\n[Youtube](https://www.youtube.com/channel/UCpVwAuE6Ul63MTJAhI0DbRg)\n\u200B\n",
    true
  ) */

  .addField(
    "SELECT ROLES",
    "Please react with one of the game emojis to get your Graviton role assigned and gain access to the game channels you are interested in. By reacting you agree to follow our server rules.\n\n <:arena:748466627942809710> | **Echo Arena**\n <:combat:748466627854729276> | **Echo Combat** \n<:towertag:748467374105165826> | **Tower Tag** \n<:beatsaber:748466702244642926> | **Beat Saber** \n<:pistolwhip:748466627527442473> | **Pistol Whip** \n<:gravity:744481770296311848> | **Gravitons** - *Not sure yet, just let me in!* \n<:vrheadset:748629381446107136> | **All Games** - *Who hurt you?* \n"
  )

/*
  .addField('', '<:arena:748466627942809710>  **Echo Arena**\n <:combat:748466627854729276>  **Echo Combat** \n<:towertag:748467374105165826>  **Tower Tag** \n<:beatsaber:748466702244642926>  **Beat Saber** \n<:pistolwhip:748466627527442473>  **Pistol Whip** \n<:gravity:744481770296311848>  **Gravitons** - Not sure yet, just let me in! \n<:vrheadset:748629381446107136>  **All Games** - Who hurt you? \n\u200b\n' )
/*
  .addField('\n<:gravity:744481770296311848>  **Gravitons**', 'Not sure yet, just let me in! \n\u200b\n' )
  .addField('<:arena:748466627942809710>  **Echo Arena**', '\n\u200b\n' )
	.addField('<:combat:748466627854729276>  **Echo Combat**', '\n\u200b\n' )
  .addField('<:towertag:748467374105165826>  **Tower Tag**', '\n\u200b\n' )
  .addField('<:beatsaber:748466702244642926>  **Beat Saber**', '\n\u200b\n' )
  .addField('<:pistolwhip:748466627527442473>  **Pistol Whip**', '\n\u200b\n' )
  .addField('<:vrheadset:748629381446107136>  **All Games**', 'Who hurt you? \n' )
/*
  .addField('───────────────────────────────\n<:gravity:744481770296311848>  **Gravitons**', 'Not sure yet, just let me in! \n───────────────────────────────' )
  .addField('/n', '<:arena:748466627942809710>  **Echo Arena** - Join our [Echo Arena](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
	.addField('<:combat:748466627854729276>  **Echo Combat**', 'Join our [Echo Combat](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
  .addField('<:towertag:748467374105165826>  **Tower Tag**', 'Join our [Tower Tag](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
  .addField('<:beatsaber:748466702244642926>  **Beat Saber**', 'Join our [Beat Saber](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
  .addField('<:pistolwhip:748466627527442473>  **Pistol Whip**', 'Join our [Pistol Whip](https://google.com) channels or join the official [Discord](https://google.com)\n───────────────────────────────' )
  .addField('<:vrheadset:748629381446107136>  **All Games**', 'Who hurt you? \n───────────────────────────────' )
*/

module.exports = {
  name: "we",
  execute: async function (message, client){
     message.delete().catch(_ => {});
     message.channel.send("https://i.imgur.com/gCTlRud.png")
     message.channel.send(embed).then(async msg => {
       await msg.react("748466627942809710");
       await msg.react("748466627854729276");
       await msg.react("748467374105165826");
       await msg.react("748466702244642926");
       await msg.react("748466627527442473");
       await msg.react("744481770296311848");
       await msg.react("748629381446107136");
      })
      .catch(error => console.log(error));
  }
};
