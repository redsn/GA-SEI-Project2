const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newBook = new Schema ({
    pages: { type: Array }
})

const Book = mongoose.model('Book', newBook);

module.exports = Book;