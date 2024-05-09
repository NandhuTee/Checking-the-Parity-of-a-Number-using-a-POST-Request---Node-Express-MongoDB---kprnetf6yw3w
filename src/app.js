const http = require('http');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/') {
    let body = '';

    // Read the incoming request body data
    req.on('data', chunk => {
      body += chunk;
    });

    // Once the request body has been fully received
    req.on('end', () => {
      try {
        // Parse the JSON data from the request body
        const requestData = JSON.parse(body);
        
        // Extract num1 from the request data
        const num1 = requestData.num1;

        // Validate num1
        if (typeof num1 !== 'number' || !Number.isInteger(num1)) {
          res.writeHead(400, {'Content-Type': 'text/plain'});
          res.end('Invalid request: num1 must be an integer.');
          return;
        }

        // Check if num1 is even or odd
        if (num1 % 2 === 0) {
          // If num1 is even, respond with 200 OK and a message indicating the number is even
          res.writeHead(200, {'Content-Type': 'text/plain'});
          res.end(`The number ${num1} is even.`);
        } else {
          // If num1 is odd, respond with 404 Not Found and a message indicating the number is odd
          res.writeHead(404, {'Content-Type': 'text/plain'});
          res.end(`The number ${num1} is odd.`);
        }
      } catch (error) {
        // Handle any JSON parsing errors
        res.writeHead(400, {'Content-Type': 'text/plain'});
        res.end('Invalid request format: Please provide valid JSON data.');
      }
    });
  } else {
    // If the request method is not POST or the URL is not "/", respond with 405 Method Not Allowed
    res.writeHead(405, {'Content-Type': 'text/plain'});
    res.end('Method Not Allowed');
  }
});

module.exports = server;
