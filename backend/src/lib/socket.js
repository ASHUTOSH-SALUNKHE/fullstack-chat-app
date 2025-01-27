import {Server} from "socket.io"
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
//What it does: This creates a Node.js HTTP server and binds it to the Express application (app).
//Purpose: Socket.IO requires a raw HTTP server to attach itself for handling WebSocket connections. The server variable now represents an HTTP server that supports both regular HTTP requests and WebSocket connections.

const io = new Server(server,{
    cors: {
        origin: ["http://localhost:5173"]
    }
});

//What it does:Creates a Socket.IO server and attaches it to the server object.Configures Cross-Origin Resource Sharing (CORS) to allow requests from http://localhost:5173 (likely the client’s development server).
//Purpose:Socket.IO listens for incoming WebSocket connections on the server.The cors option ensures that only requests from the specified origin (your client) are allowed to connect.

export function getReceiverSocketId(userId){
    return userSocketMap[userId] //it will give socket id
}

const userSocketMap = {}; //{userId : socketId}
//used to store online users

io.on("connection", (socket)=>{
    console.log("A User Is Connected",socket.id);

    const userId = socket.handshake.query.userId
    if(userId) userSocketMap[userId] = socket.id;
    
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
    //io.emit is used to send the event to all clients
    
    socket.on("disconnect", ()=> {
        console.log("User Disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));

    });
})
//The io.on("connection") event fires whenever a client connects to the Socket.IO server.
//socket represents the unique connection to that specific client. Each client gets its own socket object.
//The socket.id is a unique identifier assigned to each connected client by Socket.IO.
//The disconnect event fires when a client disconnects (e.g., closes their browser tab or loses their internet connection).
//socket.id identifies which client disconnected.

export { io , app, server };