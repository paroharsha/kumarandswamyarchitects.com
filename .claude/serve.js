// Minimal static file server for local preview only (not part of the site).
const http = require('http');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const port = process.env.PORT || process.argv[2] || 4173;
const types = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'text/javascript',
  '.jsx': 'text/babel', '.json': 'application/json', '.md': 'text/plain', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.avif': 'image/avif', '.webp': 'image/webp', '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json'
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';
  let filePath = path.join(root, urlPath);
  if (!filePath.startsWith(root)) { res.writeHead(403); return res.end('Forbidden'); }
  // Mirror GitHub Pages "pretty URLs": when the literal path is missing or is a
  // directory, prefer the sibling <path>.html (covers /projects vs the projects/
  // dir, and dotted slugs like good-shepherds-intl.-school-revitalisation that a
  // naive extension check would misread), then fall back to <dir>/index.html.
  const existsLiteral = fs.existsSync(filePath);
  if (!existsLiteral || fs.statSync(filePath).isDirectory()) {
    if (fs.existsSync(filePath + '.html')) filePath += '.html';
    else if (existsLiteral && fs.existsSync(path.join(filePath, 'index.html'))) filePath = path.join(filePath, 'index.html');
  }
  fs.readFile(filePath, (err, data) => {
    if (err) {
      const nf = path.join(root, '404.html');
      if (fs.existsSync(nf)) { res.writeHead(404, { 'Content-Type': 'text/html' }); return res.end(fs.readFileSync(nf)); }
      res.writeHead(404); return res.end('Not found: ' + urlPath);
    }
    res.writeHead(200, { 'Content-Type': types[path.extname(filePath)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log('Serving ' + root + ' on http://localhost:' + port));
