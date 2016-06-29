// export function for listening to the socket
module.exports = function (socket) {
  var name = 'new user';

  // send the new user their name and a list of users
  socket.emit('init', {
    name: name
  });

  // notify other clients that a new user has joined
  socket.broadcast.emit('player:join', {
    name: name
  });

  // broadcast a user's message to other users
  socket.on('player:joinedddd', function (data) {
    socket.broadcast.emit('player:join', {
      user: name,
      text: data.message
    });
  });

};