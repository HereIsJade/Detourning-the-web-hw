// File System for loading the list of words
var fs = require('fs');
var data=fs.readFileSync('words.json');
var words=JSON.parse(data);
console.log(words);

var express=require('express');
var app=express();
var server=app.listen(3002);

// var words={
//   text:"try with words",
//   rate:1.3,
// }

app.use(express.static('public'));

app.get('/add/:word/:text?',addWord);
function addWord(request,response){
  var data=request.params;
  var word=data.word;
  var text=data.text;

  if (!text){
    var reply={msg:"Text is required."};
    response.send(reply);
  }
  else{
    words[word]=text;

    var data=JSON.stringify(words,null,2);
    fs.writeFile('words.json',data,finished);
    function finished(err){
      console.log('all set');
      var reply={
        msg:"User data recieved.",
        key:word,
        value:text
      }
      response.send(reply);
    }
  }
}

app.get('/search/:word/',searchWord);
function searchWord(request,response){
  var word=request.params.word;//word is the key in object, words[word] is the value
  console.log("searching",word);
  var reply={msg:"searching "};
  if(words[word]){
    reply={
      status:"found",
      word:word,
      text:words[word]
    }
  }else{
    reply={
      status:"not found",
      word:word
    }
  }
  response.send(reply);//express automatically convert object to json and display it
}


app.get('/all',sendAll);
function sendAll(request,response){
  response.send(words);//express automatically convert object to json and display it
}

console.log("heyyy");

var socket=require('socket.io');
var io=socket(server);

io.sockets.on('connection',newConnection);

function newConnection(socket){
  console.log('new connection:  '+socket.id);
  socket.on('user data',userMsg);

  function userMsg(data){
    socket.broadcast.emit('user data',data);//send data to clients but not including sender itself, otherwise use socket.emit
    console.log(data);
  }
}
