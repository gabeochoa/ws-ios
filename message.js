const MsgType = Object.freeze({
  Announcement: 0,
  Normal: 1,
  Join: 2,
});

class Message {
  constructor(client_id, username, message) {
    this.client_id = client_id;
    this.username = username;
    this.message = message;
  }
}

function to_msgtype(value) {
  return Object.keys(MsgType).find((key) => MsgType[key] === value);
}

module.exports = {
  MsgType,
  Message,
  to_msgtype,
};
