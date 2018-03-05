'use strict';

const h = require('../helpers');

module.exports = (io, app) => {
  let allrooms = app.locals.chatrooms;

  

  io.of('/roomslist').on('connection', socket => {
    socket.on('getChatrooms', ()=> {
      socket.emit('chatRoomsList', JSON.stringify(allrooms));
    });

    socket.on('createNewRoom', (newroom)=> {
      // check to see if a room with same title exists
      // if not, create one and broadcast it to everyone
      if(!h.findRoomByName(allrooms, newroom)) {
        allrooms.push({
          room: newroom,
          roomID: h.randomHex(),
          users:[]
        });

        // Emit an updated list to the creator
        socket.emit('chatRoomsList', JSON.stringify(allrooms));
        // Emit an updated list to everyone connected to rooms page
        socket.broadcast.emit('chatRoomsList', JSON.stringify(allrooms));
      }

    })
  });

  io.of('/chatter').on('connection', socket => {
    // Join a chatroom
    socket.on('join', data => {
      // console.log(typeof data);
      let usersList = h.addUserToRoom(allrooms, data, socket);

      // Update the list of active users as shown on the chatroom page


    })
  });
}