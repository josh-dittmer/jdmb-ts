import * as net from 'node:net';

export function startClient() {
    const host = 'localhost';
    const port = 4484;
    const client = new net.Socket();

    let totalMessages = 0;
    let totalBytes = 0;

    client.connect(port, host, () => {
        console.log('Connection opened!');

        const buf = new Uint8Array(32768);
        buf.fill('A'.charCodeAt(0));

        let i = 1000000;

        const write = () => {
            let ok = true;
            do {
                i -= 1;
                if (i === 0) {
                    client.write(buf, () => {
                        console.log('Done writing!');
                    });
                } else {
                    ok = client.write(buf);
                }
            } while (i > 0 && ok);
            if (i > 0) {
                client.once('drain', write);
            }
        }
        write();
    });

    client.on('data', (data) => {
        totalMessages++;
        totalBytes += data.length;

        console.log(`${totalMessages}: Received ${data.length} bytes (${totalBytes} total)`);

        client.write('Test');
        //client.end();
    });

    client.on('close', () => {
        console.log('Connection closed');
    });

    client.on('error', (err) => {
        console.error('Socket error: ' + err);
    });
}