const mongoose = require('mongoose');

let User = mongoose.model('Userk', {
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        default: "unknown"
    },
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    }
});

module.exports = {
    User
}