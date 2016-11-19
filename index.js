
// Loading ENV vars
require('dotenv').config();

var request = require('request');
var fs = require('fs');
var slackBot = require('slackbots');

// Default url slack link to upload files, for more information check: https://api.slack.com/methods/files.upload
var url_link = 'https://slack.com/api/files.upload?token='+process.env.SLACK_TOKEN;
 
// creating a bot, for more options check: https://github.com/mishk0/slack-bot-api
var bot = new slackBot({
    token: process.env.SLACK_TOKEN,
    icon_emoji: ':dog:',
    name: 'Uploader'
});

bot.on('start', function() { 
	//Do something when the BOT starts 
});

// Event to listen all slack messages, to see all possible events check: https://api.slack.com/events-api
bot.on('message', function(data) {
	console.log('data:',data);
	//When someone types "uploadPicture" the bot will upload the file on the #general channel
	if (data.text == 'uploadPicture') {
		console.log('uploading..');
		
		var formData = {
		  filename: 'test.csv',
		  channels: 'general', // If you want to put more than one channel, separate using comma, example: 'general,random'
		  file: fs.createReadStream('./files/test.csv')
		};
		request.post({url: url_link, formData: formData}, function optionalCallback(err, httpResponse, body) {
		  if (err) {
		    return console.error('upload failed:', err);
		  }
		  console.log('Upload successful!  Server responded with:', body);
		});
	}
});
