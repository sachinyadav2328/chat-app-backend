import { WebSocket, WebSocketServer } from "ws";


const wss = new WebSocketServer({port :8080})

interface User {
    socket: WebSocket;
    room: string;
}
let allSockets: User[] = [];

wss.on("connection", function(socket){ 
   
  
    socket.on("message",(message)=>{
      const parsedData = JSON.parse(message.toString());
      console.log(parsedData)
      if(parsedData.type == "join"){
        allSockets.push({
            socket,
            room:parsedData.payload.roomId
        })
      }

      if(parsedData.type == "chat"){
        const currentUserRoom = allSockets.find(x => x.socket == socket)?.room
        
        allSockets.forEach(user => {
            if(user.room == currentUserRoom){
                user.socket.send(parsedData.payload.message)
            }
        })
      }
      
    })
})