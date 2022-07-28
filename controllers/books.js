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
///// get for pages browsing ///////
bookRouter.get('/new', (req,res) => {
    User.findById(req.session.user, (err, userFavs) => {
        if(err) {
            res.redirect('/')
        } else {
        res.render('books/new.ejs', {
            user: userFavs
        })}
    })
})


// DELETE //

// UPDATE //
//////  Initial adding pages ///// :::: RENAME TO FAVORITES [UPDATE]
bookRouter.post('/new/addpage/:idx', (req,res) => {
    User.findByIdAndUpdate(req.session.user,{
        $push: {
            favorites: req.params.idx
        }
    },
    (err, user)=> {
        if(err){
            console.log(err)
        } else {
            res.redirect('/pages/all/1')
        }
    }
    )
})

// CREATE //

// EDIT //

// SHOW //


/// EXPORTS ///
module.exports = bookRouter;