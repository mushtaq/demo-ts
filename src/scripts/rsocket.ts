import {
    RSocketClient,
    BufferEncoders,
} from 'rsocket-core';
import RSocketWebSocketClient from 'rsocket-websocket-client';

// Create an instance of a client
const client = new RSocketClient({
    setup: {
        // ms btw sending keepalive to server
        keepAlive: 60000,
        // ms timeout if no keepalive response
        lifetime: 180000,
        // format of `data`
        dataMimeType: 'application/octet-stream',
        // format of `metadata`
        metadataMimeType: 'application/octet-stream',
    },
    transport: new RSocketWebSocketClient({url: 'wss://...'}, BufferEncoders),
});

// Open the connection
client.connect().subscribe({
    onComplete: socket => {
        // socket provides the rsocket interactions fire/forget, request/response,
        // request/stream, etc as well as methods to close the socket.

        socket.fireAndForget({
            data: {some: {json: {value: 1}}},
            metadata: {another: {json: {value: true}}},
        });
    },
    onError: error => console.error(error),
    onSubscribe: cancel => {/* call cancel() to abort */
    }
});