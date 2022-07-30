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

/// INDEX : Book Parameter ///
bookRouter.get('/init', (req,res) => {
    if(req.session.user){
    res.render('./books/bookparam.ejs')
    } else {
        res.send('no');
    }
})

///// Generating Book ///// Edit ?
bookRouter.get('/create/:bookID/:pageNumber', (req,res) => {
    if(req.session.user){
    User.findById(req.session.user, (err, currentUser) => {
        Page.find({}, (err, allPages) => {
            Book.findById(req.params.bookID, (err, currentBook) => {
                if(err) {
                    res.redirect('/')
                } else {
                    res.render('./books/new.ejs', {
                        //// OBJECTS TO PASS ////
                        book: currentBook,
                        bookID: req.params.bookID,
                        place: req.params.pageNumber,
                        user: currentUser,
                        page: allPages,
                        session: req.session.user
                    })
                }
            })
        })
    })
    }
})

/////// POST /// PUT for BOOK GEN /////
bookRouter.put('/create/:bookID/:pageNumber', (req,res) => {
    // res.send(req.body);
    // console.log(`Pages: ${req.body.pages}`)
    Book.findByIdAndUpdate(req.params.bookID, {
        $push: {
            pages: req.body.pages,
            choiceA: req.body.choiceA,
            choiceAText: req.body.choiceAText || 'default text',
            choiceB: req.body.choiceB,
            choiceBText: req.body.choiceBText || 'default text'
        }
    },
    (err, pass) => {
        if(err){
            res.send(err, req.body)
        } else if(req.params.pageNumber < pass.pagesMax) {
            res.redirect(`/book/create/${req.params.bookID}/${parseInt(req.params.pageNumber) + 1}`)
        } else {
            res.send(pass)
        }
    }
    )
})

// NEW //
bookRouter.get('/new', (req,res) => {
    res.render('./books/new.ejs')
})
bookRouter.get('/new/:idx', (req,res) => {
    User.findById(req.session.user, (err, userFavs) => {
        if(err) {
            console.log('error with new/:idx?')
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
bookRouter.post('/init', (req,res) => {
    req.body.belongsTo = req.session.user;
    Book.create(req.body, (err, newBook) => {
        if(err){
            res.send('An error has occured. Please reconnect to this site')
        } else {
            res.redirect(`/book/create/${newBook._id}/1`)
        }
    })
})

// EDIT //

// SHOW //


/// EXPORTS ///
module.exports = bookRouter;