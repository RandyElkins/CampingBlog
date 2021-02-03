const mongoose = require('mongoose');
const connectionStr = 'mongodb://127.0.0.1:27017/goCampBlog'; // ‘camps’ is the name of the DB that will be either:
// - created, if it doesn’t already exist, or
// - connected to, if it exists



mongoose.connect(connectionStr, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => console.log('MongoDB connected to:', mongoose.connection.host, "(host) :", mongoose.connection.port, "(port)"))
    .catch((err) => console.log('MongoDB connection error :(', err));

mongoose.connection.on('disconnected', (err) => console.log('Error:', err));

module.exports = require('../models');