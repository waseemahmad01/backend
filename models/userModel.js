const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    lastname:{
        type: String,
        required: true,
        min: 3,
        max: 50,
    },
    username:{
        type:String,
        unique: true,
        required: true,
        min:3,
        max:50,
    },
    email: {
        type:String,
        max: 50,
        unique: true,
        required: true,
    },
    password:{
        type: String,
        min: 8,
        max: 250,
        required: true,
    },
});

module.exports = mongoose.model("User", userSchema);