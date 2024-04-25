const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./routes/index');

app.use(express.json());
app.use(cors());

app.use('/', router);

app.listen(3000, () => {
    console.log("Server is up and running in port 3000");
});


