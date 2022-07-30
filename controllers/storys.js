// Dependencies //
const express = require('express');

// Router //
const storyRouter = express.Router();

// Models //
const Page = require('../models/page');
const User = require('../models/user');
const Book = require('../models/book');
const Story = require('../models/story');

// INDEX //

// NEW //
storyRouter.post('/new', (err, pass) => {
    if(err){
        res.redirect('/');
    } else {
        console.log(pass)
    }
})

// DELETE //

// UPDATE //

// CREATE //

// EDIT //

// SHOW //


// EXPORT //
module.exports = storyRouter;