const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 3000 });

const message = require("./message.js");
const MsgType = message.MsgType;
const Message = message.Message;

const messages = [
  new Message("fake", "server", "test"),
  new Message("fake", "john", "howdy"),
];

server.on("connection", (socket, req) => {
  const ip = req.socket.remoteAddress;
  const user = req.url.replace("/?user=", "");
  const unique = user + ip;

  console.log(`Client ${unique} ${ip} is connected`);

  socket.send(
    JSON.stringify({
      type: MsgType.Join,
      messages: messages,
      id: unique,
    })
  );

  socket.on("message", (message) => {
    console.log(`Received the message: ${message}`);
    obj = JSON.parse(message);
    messages.push(new Message(unique, obj.username, obj.message));

    server.clients.forEach(function each(client) {
      if (client != socket && client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: MsgType.Normal,
            message: messages.at(-1),
            id: unique,
          })
        );
      }
    });
  });

  socket.on("close", () => {
    console.log("Client is disconnected");
  });
});
