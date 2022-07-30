const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newStory = new Schema({
    bookID: { type: String },
    title: { type: String },
    author: { type: String },
    pagesMax: { type: Number },
    pages: { type: Array },
    choiceA: { type: Array },
    choiceAText: { type: Array },
    choiceB: { type: Array },
    choiceBText: { type: Array },
    end: { type: Array },
    private: { type: Boolean, default: true},
    belongsTo: { type: String },
    complete: { type: Boolean, default: false}, 
    results: { type: Array }
})

const Story = mongoose.model('Story', newStory);

module.exports = Story;


/// Same as book at start, to be reviewed later