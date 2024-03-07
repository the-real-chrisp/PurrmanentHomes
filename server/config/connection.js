const mongoose = require('mongoose');

try{
    mongoose.connect('mongodb+srv://Dakota:root1@atlascluster.udubasa.mongodb.net/purrmanent-homes');
} catch (err) {
    console.log(err)
}

module.exports = mongoose.connection;
