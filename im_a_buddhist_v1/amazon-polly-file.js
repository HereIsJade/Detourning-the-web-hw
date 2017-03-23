function PollyFile(id,newUser){
  // Load the SDK
  var AWS = require('aws-sdk')
  var Fs = require('fs')
  var voiceEnUS=['Joanna','Salli','Kimberly','Kendra','Ivy','Justin','Joey'];
  var voiceEsES=['Conchita','Enrique'];
  var voiceEsUS=['Penélope','Miguel'];
  var voiceFr=['Céline','Mathieu','Chantal'];
  var voiceItIT=['Carla','Giorgio'];
  // Create an Polly client
  var Polly = new AWS.Polly({
      signatureVersion: 'v4',
      region: 'us-east-1'
  })
  var voiceId='';
  this.id=id;
  this.newUser=newUser;
  if(this.newUser.voice=='en-US'){
    voiceId=voiceEnUS[parseInt(Math.random()*7)];
  }
  else if(this.newUser.voice=='es-ES'){
    voiceId=voiceEsES[parseInt(Math.random()*2)];
  }
  else if(this.newUser.voice=='es-US'){
    voiceId=voiceEsUS[parseInt(Math.random()*2)];
  }
  else if(this.newUser.voice=='ja-JP'){
    voiceId='Mizuki';
  }
  else if(this.newUser.voice=='it-IT'){
    console.log('it');
    voiceId=voiceItIT[parseInt(Math.random()*2)];
  }
  else if(this.newUser.voice=='fr-CA'||'fr-FR'){
    voiceId=voiceFr[parseInt(Math.random()*3)];
  }

  else{
    voiceId='Joey';
  }


  var params={};//if bug, try this. later

  this.generateParams=function(){
    params={
      'Text': '<speak><prosody rate="'+this.newUser.rate+'">'+this.newUser.text+'</prosody></speak>',
      'OutputFormat': 'mp3',
      'TextType':'ssml',
      'VoiceId':voiceId
      // 'LanguageCode':this.newUser.voice
    }
  }

  this.generateFile=function(){
    console.log("entered generateFile");
    Polly.synthesizeSpeech(params, (err, data) => {
      console.log("params",params);
        if (err) {
            console.log(err.code)
        } else if (data) {
            if (data.AudioStream instanceof Buffer) {
                Fs.writeFile("sound/"+this.id+".mp3", data.AudioStream, function(err) {
                    if (err) {
                        return console.log(err)
                    }
                    console.log("The file was saved!")
                })
            }
        }
    })
  }
}
module.exports=PollyFile;
