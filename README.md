# Simple Slack bot that uploads files

Simple Code to show how to create a BOT and how to upload files using the Slack API

## Slack Token

You will need a slack Token to start using/testing bots, you can check this link to create and/or get existing tokens for your slack domain: https://api.slack.com/bot-users

## ENV Variables
After getting a token, create a `.env` file containg a SLACK_TOKEN=XXXXX_YOUR_TOKEN_XXXXXX

## Ready to go
Just `npm install` and `npm start`

## Understanding the Code 

```js

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
``` 

