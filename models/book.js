const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newBook = new Schema ({
    title: { type: String },
    pages: { type: Array },
    choices: { type: Array },
    results: { type: Array }
})

const Book = mongoose.model('Book', newBook);

module.exports = Book;