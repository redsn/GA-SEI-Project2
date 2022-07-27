/// Dependencies ///
const express = require('express');

/// Gen Router ////
const bookRouter = express.Router();

/// Models ///
const Page = require('../models/page');
const User = require('../models/user');
const Book = require('../models/book');

/// INDEX ///
///// GET for book root
bookRouter.get('/', (req,res) => {
    Book.find({}, (err, allBooks) => {
        res.render('./books/index.ejs', {book: allBooks})
    })
})

/// NEW ///
///// get for pages browsing /////// Will be used for saving favorites
bookRouter.get('/new/:idx', (req,res)  => {
    Page.find({}, (err, allPages) => {
        res.render('./pages/newindex.ejs', {pages: allPages, part: req.params.idx, user: req.session.user})
    })
})


// DELETE //

// UPDATE //
//////  Initial adding pages /////
bookRouter.post('/new/addpage/:idx', (req,res) => {
    // console.log(req.params.idx)
    console.log(req.body)
    User.findByIdAndUpdate(req.session.user,{
        $push: {
            userPath: req.params.idx
        }
    },
    (err, user)=> {
        if(err){
            console.log(err)
        } else {
            res.redirect('/book/new/1')
        }
    }
    )
})

// CREATE //

// EDIT //

// SHOW //


/// EXPORTS ///
module.exports = bookRouter;