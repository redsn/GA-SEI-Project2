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
storyRouter.put('/final/:storyID/:page', (req,res)=> {
    console.log(req.body);
    if(req.body.complete === 'on'){
        req.body.complete = true
    };
    console.log(req.body.complete)
    Story.findByIdAndUpdate(req.params.storyID, {
        $push: {
            pages: req.body.pages,
            choiceA: req.body.choiceA,
            choiceAText: req.body.choiceAText || 'Plot Hole',
            choiceB: req.body.choiceB,
            choiceBText: req.body.choiceBText || 'Deus Ex Machina'
        },
        
    },
    (err,pass) => {
        if(err){
            res.redirect('/')
        }else if(req.params.page < pass.pagesMax){
            res.redirect(`/story/final/${req.params.storyID}/${parseInt(req.params.page)+ 1}`)
        } else {
            res.redirect('/')
        }
    }
    )
})


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

        Page.findById(indexBook.pages[req.params.page - 1], (err, currentPage) => {

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