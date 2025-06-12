import * as net from 'node:net';

export function startServer() {
    const port = 3000;

    const server = net.createServer((socket) => {
        console.log(`Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

        let messagesReceived = 0;
        let totalBytesReceived = 0;

        socket.on('data', (data) => {
            if (data[0] === 'B'.charCodeAt(0)) {
                return;
            }

            totalBytesReceived += data.length;

            if (messagesReceived >= 1000)
                console.log(`${messagesReceived}: Total ${totalBytesReceived} bytes`);

            messagesReceived++;
            //console.log(`Received data: ${data.toString()}`);

            //socket.write('Test 2');

            /*setTimeout(() => {
                //socket.write('Test message');
                socket.end();
            }, 2000);*/
        });

        socket.on('close', () => {
            console.log(`Client disconnected: ${socket.remoteAddress}:${socket.remotePort}`);
        });

        socket.on('error', (err) => {
            console.error(`Socket error: ${err}`);
        });

        //socket.write('Test 1');
    });

    server.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });

    server.on('error', (err) => {
        console.error(`Server error: ${err}`);
    });
}