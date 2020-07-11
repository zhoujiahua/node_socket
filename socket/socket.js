const socketio = require('socket.io');
module.exports = (server, options) => {
    const io = socketio(server, options);
    io.on('connection', socket => {
        console.log('....................', socket);
    });
}