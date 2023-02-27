const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        // require: [true, "Name is required"]
    },
    email: {
        type: String,
        // require: [true, "Email is required"]
    },
    password: {
        type: String,
        // require: [true, "Password is required"]
    },
    friends: [
        {
            user_id: {
                type: String
            },
            name: {
                type: String
            }
        }
    ],
    image: {
            public_id: {
                type: String,
                // required: true
            },
            secure_url: {
                type: String,
                // required: true
            }
    }
})

module.exports = mongoose.model('User', userSchema)