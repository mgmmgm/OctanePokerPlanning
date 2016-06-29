// export function for listening to the socket
module.exports = function (socket) {

  // send the new user their name and a list of users
  socket.emit('init', {
    massage: 'Welcome!'
  });


  socket.on('player:newPlayerAdded', function (data) {
    // notify other clients that a new user has joined
    socket.broadcast.emit('player:join', {
      newPlayer: data.playerName
    });
  });

};