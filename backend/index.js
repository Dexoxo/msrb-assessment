const connectToDB = require("./db");
const express = require('express');
var cors = require('cors');

connectToDB();
const app = express()
const port = 4000

app.use(cors());
app.use(express.json());

// Available routes
app.use('/api/userAuth', require('./routes/userAuth'));
app.use('/api/adminAuth', require('./routes/adminAuth'));

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})