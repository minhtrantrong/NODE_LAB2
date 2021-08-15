const http = require('http');
const Pool = require('pg').Pool;
const { hostname } = require('os');
const host = 'localhost';
const port = process.env.PORT || 5000;

var query_data;
const pg_conn = new Pool (
    {
        user: 'pcydnjhdsefoqv',
        host: 'ec2-44-194-145-230.compute-1.amazonaws.com',
        database: 'd246b1gt36nk36',
        password: '2eec60707f51d97aa019f41e3b6eb42b19b4395be9b2811cac00294f8b137c13',
        port: 5432,
        ssl: {
            rejectUnauthorized: false
          },
    });
pg_conn.query("SELECT * FROM product", (error, results) => 
    {
        if (error) 
        {
            console.log(error);
            return;
        }
        console.log(results.rows[0]);
        query_data = results.rows[0]
    }
);

const server = http.createServer((req, res) => 
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end(query_data);
});

server.listen(port, hostname, () => {
   console.log(`Server is running at ${port}`);
})