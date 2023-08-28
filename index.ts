import { createServer } from 'http';
import { CONFIGS } from './src/configs';

const server = createServer((req, res) => {
  res.setHeader('ETag', 'v1');
  res.setHeader('Cache-Control', 'max-age=5');
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});

server.listen(CONFIGS.PORT, () => {
  console.log(`Server listening :${CONFIGS.PORT}`);
});
