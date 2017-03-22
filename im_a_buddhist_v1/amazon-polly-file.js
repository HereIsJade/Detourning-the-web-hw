"use strict";
// Load the SDK
const AWS = require('aws-sdk')
const Fs = require('fs')

// Create an Polly client
const Polly = new AWS.Polly({
    signatureVersion: 'v4',
    region: 'us-east-1'
})
var textstr='i am a buddhist try version 1'
let params = {
    'Text': '<speak><prosody rate="2.0">'+textstr+'</prosody></speak>',
    'OutputFormat': 'mp3',
    'TextType':'ssml',
    'VoiceId': 'Kimberly'
}

Polly.synthesizeSpeech(params, (err, data) => {
    if (err) {
        console.log(err.code)
    } else if (data) {
        if (data.AudioStream instanceof Buffer) {
            Fs.writeFile("./ssml.mp3", data.AudioStream, function(err) {
                if (err) {
                    return console.log(err)
                }
                console.log("The file was saved!")
            })
        }
    }
})
