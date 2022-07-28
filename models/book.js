const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newBook = new Schema ({
    title: { type: String },
    pagesMax: { type: Number },
    pages: { type: Array },
    choices: { type: Array },
    private: { type: Boolean, default: true},
    results: { type: Array }
})

const Book = mongoose.model('Book', newBook);

module.exports = Book;