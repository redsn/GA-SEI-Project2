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
storyRouter.post('/new', (req,res) => {
    Story.create(req.body, (err, newStory) => {
        if(err){
            res.redirect('/');
        } else {
            res.redirect(`/story/final/${newStory.id}/1`)
        }
    })
})

// DELETE //

// UPDATE //

// CREATE //

// EDIT //

// SHOW //


// EXPORT //
module.exports = storyRouter;