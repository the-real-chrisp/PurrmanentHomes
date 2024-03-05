const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const PetSchema = new Schema(
    {
        name: {
        type: String,
        required: true,
        },
        pic: {
        type: String,
        required: true,
        },
        species: {
        type: String,
        required: true,
        },
        color: {
        type: String,
        required: true,
        },
        age: {
        type: Number,
        required: true,
        },
        gender: {
        type: String,
        required: true,
        },
    },
    {
        toJSON: {
          virtuals: true,
        },
    }
);


const Pets = model('Pets', PetsSchema);

module.exports = Pets;
