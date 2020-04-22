var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = 8080;
var counter = 1;
var max = 10;


app.get('/', function(req, res){
  res.sendFile(__dirname +'/index.html');
});

io.on('connection', function(socket){
  console.log("A user has connected")
  
  if (counter > max) {
    socket.emit('disconnect', 'I\'m sorry, too many connections');
    console.log("Tarbort")
    socket.disconnect();
  } else {
    socket.on('disconnect', function () {
      counter--;   
      console.log("A user has Left the channel")
    })
  }

  console.log(counter)
  counter++;
});

/* io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});*/

http.listen(port, function(){
  console.log('listening on *: ' + port);
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});



// This will emit the event to all connected socket
//io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 