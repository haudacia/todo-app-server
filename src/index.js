const express = require('express');
const { connectDB } = require('./data_mongo');
const app = express();
const cors = require('cors');
const router = require('./routes/index');
const mongo = require('./data_mongo/index');

app.use(express.json());
// Allow specific origin(s)
app.use(cors());
app.use('/', router);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('Server is up and running in port 3000⚡');
});
module.exports = { app, server };



