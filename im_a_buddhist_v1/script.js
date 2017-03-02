var synth = window.speechSynthesis;

var inputForm = document.querySelector('form');
var inputTxt = document.querySelector('.txt');
var voiceSelect = document.querySelector('select');

var rate = document.querySelector('#rate');
var rateValue = document.querySelector('.rate-value');

var voices = [];
var numRepeat=50;
var text='';
var utterThis;
var gif;

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
  for(let i=0;i<numRepeat;i++){
    text+=inputTxt.value;
  }
  console.log(text+" typeof: "+typeof(text));
  utterThis = new SpeechSynthesisUtterance(text);

  utterThis.rate = rate.value;
  var selectedOption = voiceSelect.selectedOptions[0].getAttribute('data-name');
  for(i = 0; i < voices.length ; i++) {
    if(voices[i].name === selectedOption) {
      utterThis.voice = voices[i];
      break;
    }
  }

  utterThis.onstart = function() {
            console.log('Speaker started');
          };
  utterThis.onend = function() {
            console.log('Speaker ended');
          };
  synth.speak(utterThis);
  chooseGif(rate.value);
}

inputTxt.blur();

rate.onchange = function(event) {
  event.preventDefault();
  synth.cancel();
  console.log("onChange, rate.value="+rate.value);
  rateValue.textContent = rate.value*100+'%';
  utterThis.rate = rate.value;
  synth.speak(utterThis);
  chooseGif(rate.value);
  // document.getElementById('gifs').src="gif/flung.gif";
  //synth.resume();
}
