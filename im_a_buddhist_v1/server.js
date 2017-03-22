var express=require('express');
var app=express();
var server=app.listen(3002);

app.use(express.static('public'));

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
// var http = require('http'),
//     fs = require('fs');
//
//
// fs.readFile('index.html', function (err, html) {
//     if (err) {
//         throw err;
//     }
//     http.createServer(function(request, response) {
//         response.writeHeader(200, {"Content-Type": "text/html"});
//         response.write(html);
//         response.end();
//     }).listen(8000);
// });
