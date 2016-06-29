// export function for listening to the socket
module.exports = function (socket) {

  socket.emit('init', {
    massage: 'Welcome!'
  });


  socket.on('player:newPlayerAdded', function (data) {
    // notify other clients that a new player has joined
    socket.broadcast.emit('player:joined', {
      newPlayer: data.playerName
    });
  });

  socket.on('player:playerVote', function (data) {
    // notify other clients that player has voted
    socket.broadcast.emit('player:voted', data);
  });

  socket.on('vote:finishVoting', function (data) {
    // notify other clients that everyone finish voting
    socket.broadcast.emit('vote:everyoneFinishVoted', data);
  });

  socket.on('userstory:goToNext', function (data) {
    // notify other clients to move to next userstory
    socket.broadcast.emit('userstory:goToNextUserstory', data);
  });

};