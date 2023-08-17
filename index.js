const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const httpserver = http.createServer(app);
const io = new Server(httpserver);
const PORT = 5000;
const Router = require("./server/router/router");
const {addUser,removeUser,getUserdata} = require('./server/controlers/controllers');

app.use(express.static("public"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(Router);

io.on("connection", (socket) => {
  socket.on("join", (options, callback) => {

    //on user disconnect
    socket.on('disconnect',()=>{
      //removing user on disconnect
      removeUser(socket.id);
      console.log(`user disconnected ${options.username}`);
      io.to(user.roomid).emit('usersList',getUserdata());
    })

    console.log(`A user is connected: ${options.username} `);
    const { error, user } = addUser({ id: socket.id, ...options });
    if(error){
      callback(error);
    }else{
      socket.join(user.roomid);
      io.to(user.roomid).emit('welcome', options.username);
      io.to(user.roomid).emit('userNames',getUserdata());
      socket.on('send-message',(mes)=>{
        socket.broadcast.to(user.roomid).emit('recevied-message', mes,user.username);
      });
    }
  });
});

httpserver.listen(PORT, () => {
  console.log(`RUNNING AT PORT NUMBER ${PORT}`);
});
