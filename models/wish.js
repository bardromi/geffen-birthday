const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const WishSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    taken: {
        type: Boolean
    }
});

module.exports = Wish = mongoose.model('wish', WishSchema);