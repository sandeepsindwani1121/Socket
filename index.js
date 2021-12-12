const express=require('express');
const socketIO=require('socket.io');
const http=require('http')
const port=process.env.PORT||3000
var app=express();
const path=require('path');
let server=http.createServer(app);
var io=socketIO(server);
  // Set public directory
app.use(express.static(path.join(__dirname)));
// make connection with user from server side
io.on('connection', (socket)=>{
  console.log('New user connected');
   
  
  // listen for message from user
  socket.on('clientMessage', (newMessage)=>{
    console.log('clientMessage', newMessage);

      //emit message from server to user
   socket.broadcast.emit('serverMessage', {  from:'jen@mds', text:'hepppp', createdAt:123 });


  });
  
  // when server disconnects from user
  socket.on('disconnect', ()=>{
    console.log('disconnected from user');
  });
});
  
server.listen(port);

// app.get('/',function(req,res){
// res.sendFile(__dirname+"/index.html");

// });
// app.get('/chat',function(req,res){
// res.sendFile(__dirname+"/chat.html");

// });