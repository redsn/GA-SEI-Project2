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

//// INDEX : My Collection ////
bookRouter.get('/collection', (req,res) => {
    User.findById(req.session.user, (err, userFavs) => {
        if(err) {
            res.redirect('/') // build a 404 that redirects
        } else {
            Page.find({}, (err, pages) => {
                res.render('books/collection.ejs', {
                    session: req.session.user,
                    user: userFavs,
                    page: pages
                })
            })
        }
    })
})

// NEW //
bookRouter.get('/new/:idx', (req,res) => {
    User.findById(req.session.user, (err, userFavs) => {
        if(err) {
            res.redirect('/') // build a 404 that redirects
        } else {
            Page.find({}, (err, pages) => {
                res.render('books/new.ejs', {
                    place: req.params.idx,
                    session: req.session.user,
                    user: userFavs,
                    page: pages
                })
            })
        }
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