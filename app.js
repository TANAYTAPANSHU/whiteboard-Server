const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const cors = require('cors')

const app = express();
app.use(cors({origin: 'http://localhost:3000/'}))
const httpServer = createServer(app);

//io server for 
const io = new Server(httpServer, { cors: 'http://localhost:3000/' });
io.on("connection", (socket) => {
  console.log("THis server connected ")
  socket.on('beginPath',(arg) => {
    socket.broadcast.emit('beginPath',arg)
  } )

  socket.on('drawLine',(arg) => {
    socket.broadcast.emit('drawLine',arg)
  } )


  socket.on('changeConfig',(arg) => {
    console.log("this is the changeconfig ",arg)
    socket.broadcast.emit('changeConfig',arg)
  } )


});



httpServer.listen(5001);