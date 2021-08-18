const express = require('express');
const app = express();
const PORT = 5000;

app.get('/', (req, res) => {
    res.send('Hello Cloud computing Class!')
});

app.listen(PORT, () => {
    console.log(`Express APP listening at ${PORT}`);
});
