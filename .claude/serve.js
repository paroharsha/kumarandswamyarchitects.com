// Minimal static file server for local preview only (not part of the site).
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = 4173;
const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.jsx': 'text/babel', '.json': 'application/json', '.md': 'text/plain', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  let filePath = path.join(root, urlPath);
  if (!filePath.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); return res.end('Not found: ' + urlPath); }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log('Serving ' + root + ' on http://localhost:' + port));
