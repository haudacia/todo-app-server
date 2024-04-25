const mongoose = require('mongoose');

mongoose.connect('mongodb://hadassa:boilerplate@localhost:27022/app?authSource-admin')

const mongo = mongoose.connection;

module.exports = mongo;