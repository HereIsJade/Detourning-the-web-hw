var socket;
socket= io.connect('http://localhost:3002');
socket.on('user data',newData);
function newData(data){
  console.log('all data recieved',data);
}

var count;

var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];
var numRepeat=30;
var text='';
var utterThis;
var gif;

var trulyEnd=true;

function populateVoiceList() {
  voices = synth.getVoices();
  var selectedIndex = voiceSelect.selectedIndex < 0 ? 0 : voiceSelect.selectedIndex;
  voiceSelect.innerHTML = '';
  for(i = 0; i < voices.length ; i++) {
    var option = document.createElement('option');
    option.textContent = voices[i].name + ' (' + voices[i].lang + ')';

    if(voices[i].default) {
      option.textContent += ' -- DEFAULT';
    }
    //console.log(voices[i].voiceURI);

    option.setAttribute('data-lang', voices[i].lang);
    option.setAttribute('data-name', voices[i].name);
    voiceSelect.appendChild(option);
  }
  voiceSelect.selectedIndex = selectedIndex;
}

function chooseGif(rateVal){
  if(rateVal>=0.8 && rateVal<0.95){
    document.getElementById('gifs').src="gif/animated180.gif";
  }
  else if(rateVal>=0.95 && rateVal<1.1){
    document.getElementById('gifs').src="gif/animated80.gif";
  }
  else if(rateVal>=1.1 && rateVal<1.2){
    document.getElementById('gifs').src="gif/animated65.gif";
  }
  else if(rateVal>=1.2 && rateVal<1.3){
    document.getElementById('gifs').src="gif/animated50.gif";
  }
  else if(rateVal>=1.3 && rateVal<1.4){
    document.getElementById('gifs').src="gif/animated40.gif";
  }
  else if(rateVal>=1.4 && rateVal<1.6){
    document.getElementById('gifs').src="gif/animated30.gif";
  }
  else if(rateVal>=1.6 && rateVal<1.8){
    document.getElementById('gifs').src="gif/animated20.gif";
  }
  else if(rateVal>=1.8 && rateVal<2){
    document.getElementById('gifs').src="gif/animated10.gif";
  }
  else if(rateVal>=2 && rateVal<2.2){
    document.getElementById('gifs').src="gif/animated9.gif";
  }
  else if(rateVal>=2.2 && rateVal<2.4){
    document.getElementById('gifs').src="gif/animated8.gif";
  }
  else if(rateVal>=2.4 && rateVal<2.6){
    document.getElementById('gifs').src="gif/animated7.gif";
  }
  else if(rateVal>=2.6 && rateVal<2.8){
    document.getElementById('gifs').src="gif/animated6.gif";
  }
  else if(rateVal>=2.8){
    document.getElementById('gifs').src="gif/animated5.gif";
  }
}

populateVoiceList();
if (speechSynthesis.onvoiceschanged !== undefined) {
  speechSynthesis.onvoiceschanged = populateVoiceList;
}

inputForm.onsubmit = function(event) {
  console.log(event);
  event.preventDefault();
  synth.cancel();
  inputTxt.value=inputTxt.value+" ";
  text='';
  var textMp3='';
  for(let i=0;i<numRepeat;i++){
    text+=inputTxt.value;
    if(i==5){
      textMp3=text;
    }
  }

  utterThis = new SpeechSynthesisUtterance(text);
  var rateVal=rate.value;
  rateVal=parseFloat(rateVal).toFixed(1);
  utterThis.rate = rateVal;
  var lang='';
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
      lang=voices[i].lang;
      break;
    }
  }

  utterThis.onstart = function() {
            console.log('Speaker started');
          };
  utterThis.onend = function() {
    if(trulyEnd){
      console.log('Speaker ended');
      location.replace("../withThreejs/helloWorld.html");
    }
    else{
      console.log('Speaker ended due to changes');
      trulyEnd=true;
    }
          };
  synth.speak(utterThis);
  chooseGif(rate.value);

  $.getJSON( "/all").done(function( data ) {
    count=data.count;
    console.log("count in onSubmit",count);

    var newUser={
      id:count,
      text:textMp3,
      rate:rateVal,
      voice:lang
    }
    $.getJSON( "/add/"+newUser.id+"/"+newUser.text+"/"+newUser.rate+"/"+newUser.voice).done(function( data ) {
      console.log("client side new user data:");
      console.log(data);
    });

  });

}

inputTxt.blur();

rate.onchange = function(event) {
  trulyEnd=false;
  event.preventDefault();
  synth.cancel();
  // console.log("onChange, rate.value="+rateVal);
  var rateVal=rate.value;
  rateVal=parseFloat(rateVal).toFixed(1);
  utterThis.rate = rateVal;
  console.log("onChange, rateVal="+rateVal);
  rateValue.textContent = rateVal*100+'%';
  // utterThis.rate = rate.value;
  synth.speak(utterThis);
  chooseGif(rate.value);
  // document.getElementById('gifs').src="gif/flung.gif";
  //synth.resume();
}
