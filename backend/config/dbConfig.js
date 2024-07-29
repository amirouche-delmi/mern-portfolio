const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL);

const connection = mongoose.connection;

connection.on('error', () => {
    console.log('Error connecting to database')
})

connection.on('connected', () => {
    console.log('Connected to mongodb');
})

module.exports = connection;