const express = require('express');
const { connectDB } = require('./data_mongo');
const app = express();
const cors = require('cors');
const router = require('./routes/index');
const mongo = require('./data_mongo/index');

app.use(express.json());
app.use(cors());
// Allow specific origin(s)
app.use(cors({
    origin: [
        'https://todo-app-server-1.onrender.com',
        'https://todo-app-3brv.onrender.com/'
    ]
}));
app.use('/', router);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT;

const server = app.listen(port, () => {
    console.log('Server is up and running in port 3000⚡');
});
module.exports = { app, server };



