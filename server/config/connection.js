const mongoose = require('mongoose');
require("dotenv").config();

try{
    mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/purrmanent-homes');
} catch (err) {
    console.log(err)
}

module.exports = mongoose.connection;