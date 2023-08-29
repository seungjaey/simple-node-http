import { createServer, RequestListener } from 'http';
import { open } from 'fs/promises';
import { createHash } from 'crypto';
import { CONFIGS } from './src/configs';

const handlePublicResourceRequest: RequestListener = async (req, res) => {
  const { url } = req;
  const resourcePath = `${__dirname}/src${url}`;
  const file = await open(resourcePath);
  const fileBuffer = await file.readFile();
  const contentHash = createHash('sha256');
  contentHash.update(fileBuffer);
  const fileStat = await file.stat();
  const etag = contentHash.digest('hex');
  const lastModified = fileStat.mtime;

  // TODO: Set Static Resource Cache Header
  res.setHeader('Cache-Control', 'max-age=10');
  res.setHeader('ETag', etag);
  res.setHeader('Last-Modified', lastModified.toString());
  res.writeHead(200, { 'Content-Type': 'image/png' });
  res.end(fileBuffer);
  file.close();
};

const server = createServer((req, res) => {
  const { url } = req;
  const isPublicResource = url?.startsWith('/public');
  if (isPublicResource) {
    return handlePublicResourceRequest(req, res);
  }
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('ok');
});

server.listen(CONFIGS.PORT, () => {
  console.log(`Server listening :${CONFIGS.PORT}`);
});
