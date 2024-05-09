// app.js

const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST') {
    const chunks = [];

    req.on('data', chunk => {
      const buf = Buffer.from(chunk);
      const str = buf.toString();
      chunks.push(str);
      const obj = JSON.parse(chunks.join(''));

      // Check if the number is odd or even
      const num = obj.num1;
      const result = num % 2 === 0 ? 'even' : 'odd';

      // Set appropriate status code and response
      if (Number.isInteger(num)) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end(`The number ${num} is ${result}.`);
      } else {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid input. Please provide a valid integer.');
      }
    });
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

module.exports = server;
