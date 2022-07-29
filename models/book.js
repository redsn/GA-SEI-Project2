const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newBook = new Schema ({
    title: { type: String },
    pagesMax: { type: Number },
    pages: { type: Array },
    choiceA: { type: Array },
    choiceAText: { type: Array },
    choiceB: { type: Array },
    choiceBText: { type: Array },
    private: { type: Boolean, default: true},
    belongsTo: { type: String },
    complete: { type: Boolean, default: false}, 
    results: { type: Array }
})

const Book = mongoose.model('Book', newBook);

module.exports = Book;