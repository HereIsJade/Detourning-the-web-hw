var fs = require('fs');
var data=fs.readFileSync('user.json');
var users=JSON.parse(data);
// console.log(users);


var PollyFile = require("./amazon-polly-file");


var express=require('express');
var app=express();
var server=app.listen(3002);

app.use(express.static('public'));

app.get('/add/:id/:text?/:rate/:voice',addUser);
function addUser(request,response){
  var data=request.params;

  var id=data.id
  var text=data.text;
  var rate=Number(data.rate);
  var voice=data.voice;

  var eachUser={
    text: text,
    rate: rate,
    voice: voice
  }

  if (!text){
    var reply={msg:"Missing user wish texts."};
    response.send(reply);
  }
  else{
    users["count"]++;
    users[id]=eachUser;
    var data=JSON.stringify(users,null,2);
    fs.writeFile('user.json',data,finished);
    function finished(err){
      console.log('all set');
      var reply={
        msg:"User data recieved.",
        key:id,
        value:eachUser
      }
      pollyFile=new PollyFile(id,users[id]);
      pollyFile.generateParams();
      pollyFile.generateFile();
      response.send(reply);
    }
  }


}


// app.get('/search/:word/',searchWord);
// function searchWord(request,response){
//   var word=request.params.word;//word is the key in object, words[word] is the value
//   console.log("searching",word);
//   var reply={msg:"searching "};
//   if(words[word]){
//     reply={
//       status:"found",
//       word:word,
//       text:words[word]
//     }
//   }else{
//     reply={
//       status:"not found",
//       word:word
//     }
//   }
//   response.send(reply);//express automatically convert object to json and display it
// }


app.get('/all',sendAll);
function sendAll(request,response){
  response.send(users);//express automatically convert object to json and display it
}

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
