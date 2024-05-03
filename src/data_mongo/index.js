const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

let dbUrl = process.env.MONGO_URL;
let mongodb;

exports.connectDB = async () => {
    mongoose.set('strictQuery', false);

    try {
        if (process.env.NODE_ENV === 'test') {
            mongodb = await MongoMemoryServer.create();
            dbUrl = mongodb.getUri();
            console.log(dbUrl);
        }

        await mongoose.connect(dbUrl);;
        const mongo = mongoose.connection;
        mongo.on('error', (error) => console.error(error));
    } catch (e) {
        console.log(e);
    }
};

/* const mongo = mongoose.connection;
mongo.on('error', (error) => console.log(error));
mongo.once('open', () => {
    console.log('connected to database');
})


module.exports = mongo;*/