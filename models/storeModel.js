const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "A store must have a title"],
        minlength: [5, "Title must be atleast 5 characters long"],
        maxlength: [50, "Title must be below 50 characters"],
        unique: [true, "Title must be unique"],
    },
    description:{
        type: String,
        required: [true, "Must have a description"]
    },
    catagory:{
        type:String,
        required: [true, "A store must have a catagory"]
    },
    createdBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Item"
    }
});

module.exports = mongoose.model('Store', storeSchema);