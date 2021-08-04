const http = require('http');
const { hostname } = require('os');
const host = 'localhost';
const port = 8080;
const server = http.createServer((req, res) => 
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello Cloud computing class!');
});
server.listen(port, hostname, () => {
   console.log(`Server is running at ${port}`);
})