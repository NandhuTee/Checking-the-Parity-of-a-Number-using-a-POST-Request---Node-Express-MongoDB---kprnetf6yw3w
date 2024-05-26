const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        const num1 = parseInt(data.num1);

        if (!isNaN(num1)) {
          let result;
            if (num1 % 2 === 0) {
              result = The number ${num1} is even;
              res.writeHead(200, { 'Content-Type': 'text/plain' });
            } else {
              result = The number ${num1} is odd;
              res.writeHead(404, { 'Content-Type': 'text/plain' });
          }
          res.end(result);
        } else {
          res.writeHead(400, { 'Content-Type': 'text/plain' });
          res.end('Invalid input: num1 must be a number');
        }
      } catch (error) {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid JSON format');
      }
    });
  } else {
    res.writeHead(405, { 'Content-Type': 'text/plain' });
    res.end('Method Not Allowed');
  }
});

module.exports = server;
