var io = require('socket.io')(8080)

var texts = []


io.sockets.on('connection', function(socket){
  socket.on('echo', function(data){
    socket.emit('echo',data)
  })
  socket.on('echo-ack', function(data, callback){
    callback(data)
  })
  socket.on('send:text', function(data){
    texts.push(data)
    io.sockets.emit('send:text', texts)
  })
  socket.on('change:color', function(data){
    io.sockets.emit('change:color', data)
  })
})