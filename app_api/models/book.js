const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({

    star: {
        type: Number,
        default: 0,
       // required: true
    },
    feedBack: {
        type: String
    },
    userName: {
        type: String,
       // required: true
    }

})

const bookSchema = new mongoose.Schema({

    bookName: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    type: {
        type: String
    },
    reviews: [reviewSchema],
    price: {
        type: Number,
        required: true
    }
});

mongoose.model('books', bookSchema);