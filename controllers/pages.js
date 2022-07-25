////// Dependencies /////
const express = require('express');

///// Router /////
const pageRouter = express.Router();

///// Models /////
const Page = require('../models/page');
const User = require('../models/user');

/// logged in? ///
// pageRouter.use(function(req,res,next){
//     if(req.session.user){
//         next()
//     } else {
//         res.redirect('/user/login')
//     }
// })

//INDEX//
pageRouter.get('/', (req,res) => {
    Page.find({}, (err, findPage) => {
        res.render('./pages/index.ejs', { pages: findPage})
    })
})

//NEW//
pageRouter.get('/new', (req,res) => {
    res.render('./pages/new.ejs', {id: req.session.user})
})

//DELETE//

//UPDATE//

//CREATE//
pageRouter.post('/', (req,res) => {
    Page.create(req.body, (err, newPage) => {
        if(err){
            res.send('something went wrong');
        } else {
            res.redirect('/pages')
        }
    })
})

//EDIT//

//SHOW//
pageRouter.get('/:idx', (req,res) => {
    Page.findById(req.params.idx, (err, showPage) => {
        res.render('./pages/show.ejs', {page: showPage})
    })
})

///// EXPORTS /////
module.exports = pageRouter;