"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", function (socket) {
    socket.on("message", (message) => {
        var _a;
        const parsedData = JSON.parse(message.toString());
        console.log(parsedData);
        if (parsedData.type == "join") {
            allSockets.push({
                socket,
                room: parsedData.payload.roomId
            });
        }
        if (parsedData.type == "chat") {
            const currentUserRoom = (_a = allSockets.find(x => x.socket == socket)) === null || _a === void 0 ? void 0 : _a.room;
            allSockets.forEach(user => {
                if (user.room == currentUserRoom) {
                    user.socket.send(parsedData.payload.message);
                }
            });
        }
    });
});
