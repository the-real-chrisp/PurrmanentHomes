const { Schema, model } = require('mongoose');

const PetSchema = new Schema(
    {
        name: {
        type: String,
        required: true,
        },
        pic: {
        type: String,
        default: '',
        // required: true,
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
        type: String,
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


const Pet = model('Pet', PetSchema);

module.exports = Pet;
