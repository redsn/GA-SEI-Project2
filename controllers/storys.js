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
    console.log(req.body)
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
//Story creation "edit"//
storyRouter.get('/final/:storyID/:page', (req,res) => {
    if(!req.session.user){
        res.redirect('/')
    } else {
Story.findById(req.params.storyID, (err, findStory)=>{
    Book.findById(findStory.bookID, (err, indexBook) => {

        console.log(`indexBook: ${indexBook}`)

        Page.findById(indexBook.pages[req.params.page], (err, currentPage) => {

                res.render('./storys/edit.ejs', {
                    book: indexBook,
                    page: currentPage,
                    story: findStory,
                    STORYID: req.params.storyID,
                    PAGEID: req.params.page
                })
        })
    })
})
}
})

// SHOW //


// EXPORT //
module.exports = storyRouter;