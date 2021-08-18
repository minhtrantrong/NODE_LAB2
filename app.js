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
        console.log(results);
        query_data = results;
    }
);
// Create a function to display a table from query_data
function display_table(data)
{
    var results_string = `
    <html>
    <head>
    <title>Fetch PG table by Node.js</title>
    </head>
    <body>
    <h2>Display Data using Node.js & PostgreSQL</h2>
        <table border="1">
        <tr>`;
    let num_fiels = data.fields.length;
    let num_rows = data.rows.length;
    const list_fields = [];
    // Display table header (list of field names)
    for (let i=0; i<num_fiels; i++)
    {
        let field_name = data.fields[i].name;
        list_fields.push(field_name);
        results_string += `<th>${field_name}</th>`;
    }
    results_string += `</tr>`;
    // Display all rows
    for (let i=0; i<num_rows; i++)
    {
        results_string += `<tr>`;
        // display every fields
        for (let j=0; j<num_fiels; j++)
        {
            let cell = data.rows[i][list_fields[j]];
            results_string += `<td>${cell}</td>`;
        }
        results_string += `</tr>`;
    }
    results_string += `</tabel>
                        </body>
                        </html>`;
    return results_string;
}


const server = http.createServer((req, res) => 
{
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end(display_table(query_data));
});

server.listen(port, hostname, () => {
   console.log(`Server is running at ${port}`);
});