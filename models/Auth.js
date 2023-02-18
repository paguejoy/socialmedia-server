const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is required"]
    },
    email: {
        type: String,
        require: [true, "Email is required"]
    },
    password: {
        type: String,
        require: [true, "Password is required"]
    }
})

module.exports = mongoose.model('User', userSchema)