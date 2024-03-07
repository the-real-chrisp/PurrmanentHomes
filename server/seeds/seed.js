const db = require('../config/connection');
const { User, Pet } = require('../models');
const userSeeds = require('./userSeeds.json');
const petSeeds = require('./petSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
    try {
        await cleanDB('User', 'users');

        await cleanDB('Pet', 'pets');

        await User.create(userSeeds);

        await Pet.create(petSeeds);

        console.log('Seeding complete!');
        process.exit(0);
    } catch (err) {
        throw err;
    }
});