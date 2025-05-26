import * as net from 'node:net';

export function startClient() {
    const host = 'localhost';
    const port = 4444;

    const client = new net.Socket();

    let totalMessages = 0;
    let totalBytes = 0;

    client.connect(port, host, () => {
        console.log('Connection opened!');

        /*const buf = new Uint8Array(32768);
        buf.fill('A'.charCodeAt(0));

        const write = (data) => {
            if (!client.write(data)) {
                client.once('drain', write);
            }
        }

        for (let i = 0; i < 10; i++) {
            write(buf);
        }*/
    });

    client.on('data', (data) => {
        totalMessages++;
        totalBytes += data.length;

        if (totalMessages >= 100)
            console.log(`${totalMessages}: Received ${data.length} bytes (${totalBytes} total)`);

        //client.end();
    });

    client.on('close', () => {
        console.log('Connection closed');
    });

    client.on('error', (err) => {
        console.error('Socket error: ' + err);
    });
}