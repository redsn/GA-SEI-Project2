/// Dependencies ///
const express = require('express');

/// Gen Router ////
const bookRouter = express.Router();

/// Models ///
const Page = require('../models/page');
const User = require('../models/user');
const Book = require('../models/book');

/// INDEX ///
bookRouter.get('/', (req,res) => {
    Book.find({}, (err, allBooks) => {
        res.render('./books/index.ejs', {book: allBooks})
    })
})

/// NEW ///
bookRouter.get('/new/:idx', (req,res)  => {
    Page.find({}, (err, allPages) => {
        res.render('./books/combine.ejs', {pages: allPages, part: req.params.idx})
    })
})


/// EXPORTS ///
module.exports = bookRouter;