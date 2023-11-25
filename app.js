const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());
app.use(cors());


app.get('/', (req, res) => {
    res.json({ pluma: "Pluma. Find your People. Trade your books."})
});


module.exports = app;