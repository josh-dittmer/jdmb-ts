import * as net from 'node:net';

const port = 3000;

const server = net.createServer((socket) => {
    console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

    socket.on('data', (data) => {
        console.log(`Received data: ${data.toString()}`);

        socket.write('Test 2');

        setTimeout(() => {
            socket.write('Test 3');
        }, 2000);
    });

    socket.on('close', () => {
        console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
    });

    socket.on('error', (err) => {
        console.error(`Socket error: ${err}`);
    });

    socket.write('Test 1');
});

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

server.on('error', (err) => {
    console.error(`Server error: ${err}`);
});