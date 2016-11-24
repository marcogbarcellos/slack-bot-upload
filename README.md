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


// Loading ENV vars
require('dotenv').config();

var fs = require('fs');
var slackBot = require('slackbots');
var Slack = require('nodejslack');

// Creating instance to connect to Slack. check: https://github.com/marcogbarcellos/nodejslack
var slack = new Slack(process.env.SLACK_TOKEN);

// creating a bot, for more options check: https://github.com/mishk0/slack-bot-api
var bot = new slackBot({
    token: process.env.SLACK_TOKEN
});



bot.on('start', function() { 
	//Do something when the BOT starts 
	console.log('BOT started listening...');
});

// Event to listen all slack messages, to see all possible events check: https://api.slack.com/events-api
bot.on('message', function(data) {
	
	//When someone types "uploadPicture" the bot will upload the file on the #general channel
	if (data.text == 'uploadFile') {
		
		var form = {
		  file: fs.createReadStream('package.json'), // Optional, via multipart/form-data. If omitting this parameter, you MUST submit content
		  // content: 'Your text here', // Optional, File contents. If omitting this parameter, you must provide a `file` 
		  filename: 'package.json', // Required 
		  fileType: 'post', // Optional, See more file types in https://api.slack.com/types/file#file_types
		  title: 'Title of your file!', // Optional
		  initial_comment: 'First comment about this file.', // Optional
		  channels: 'general' //Optional, If you want to put more than one channel, separate using comma, example: 'general,random'
		};

		slack.fileUpload(form)
		.then(function(response){

			// Slack sends a json with a boolean var ok. 
			// Error example : data = { ok: false, error: 'user_not_found' }
			// Error example : data = { ok: true, file: 'user_not_found' }
			if(!response || !response.ok){
				return Promise.reject(new Error('Something wrong happened during the upload.'));
			}
			console.log('Uploaded Successfully:',response);

			return Promise.resolve(response);
		})
		.catch(function(err){
			console.log('Failed on Uploading:',err);

			return Promise.reject(err);
		});
	}
});

``` 

