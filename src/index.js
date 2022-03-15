const sdk = require("node-appwrite");
const { Client, Intents } = require('discord.js');

/*
  'req' variable has:
    'headers' - object with request headers
    'payload' - object with request body data
    'env' - object with environment variables

  'res' variable has:
    'send(text, status)' - function to return text response. Status code defaults to 200
    'json(obj, status)' - function to return JSON response. Status code defaults to 200

  If an error is thrown, a response with code 500 will be returned.
*/

module.exports = async function (req, res) {
  initClient(req);
};


function initClient(req) {
  const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

  client.once('ready', () => {
    console.log('Ready!');
  });

  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    console.log('AAAAA');

    let command = message.content.split(' ')[0];
    let params = message.content.split(' ').slice(1);

    console.log(command);

    switch (command) {
      case '!ping':
        message.channel.send('Pong!');
        break;
      case '!purge':
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
          let amount = parseInt(params[0]) + 1;
          message.channel.bulkDelete(amount);
        }
        break;
      case '!warn':
        if (message.member.hasPermission('MANAGE_MESSAGES')) {
          let member = message.mentions.members.first();
          let reason = params.slice(1).join(' ');
          let warnEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle('Warn')
            .setDescription(`${member} has been warned for ${reason}`);
          message.channel.send(warnEmbed);
        }
      }
  });

  client.login(req.env['DISCORD_TOKEN']);
}

initClient();