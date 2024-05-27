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
        methods: ["POST", "GET", "PATCH", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
        credentials: true

    }
));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "https://todo-app-3brv.onrender.com");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
// Middleware para lidar com requisições preflight (??)
app.options('*', cors({
    origin: ["https://todo-app-server-cc9x.onrender.com"],//url render backend
    methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true

}));
app.use('/', router);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log('Server is up and running in port 3000⚡');
});
module.exports = { app, server };

