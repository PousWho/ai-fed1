import { createApp } from './server.js';
const port = Number.parseInt(process.env.PORT || '4000', 10);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error('Invalid PORT');
createApp().listen(port, '127.0.0.1' === process.env.HOST ? '127.0.0.1' : '0.0.0.0', () => console.log(`Backend ready on port ${port}`));
