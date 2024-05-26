const express = require('express');
const { connectDB } = require('./data_mongo');
const cors = require('cors');
const router = require('./routes/index');
const mongo = require('./data_mongo/index');

const app = express();
app.use(express.json());
// Allow specific origin(s)
app.use(cors(
    {
        origin: ["https://todo-app-server-cc9x.onrender.com"],
        methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }
));

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    next() // náo entendi mas coloquei isso aqui (de algum forum
})
// Middleware para lidar com requisições preflight (??)
app.options('*', cors({
    origin: ["https://todo-app-server-cc9x.onrender.com"],//url render backend
    methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use('/', router);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('Server is up and running in port 3000⚡');
});
module.exports = { app, server };

