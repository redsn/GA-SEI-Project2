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
pageRouter.put('/:idx', (req,res) => {
    Page.findByIdAndUpdate(
        req.params.idx,
        req.body,
        {new:true}, (err, updatePage)  => {
            res.redirect(`/pages/${req.params.idx}`)
        }
    )
})

//CREATE//
pageRouter.post('/', (req,res) => {
    if(!req.session.user){
        req.body.belongsTo = 'public';
        req.body.createdBy = 'An Author'
    } else {
        req.body.belongsTo = req.session.user
    }
    Page.create(req.body, (err, newPage) => {
        if(err){
            res.send('something went wrong');
        } else {
            res.redirect('/pages')
        }
    })
})

//EDIT//
pageRouter.get('/:idx/edit', (req,res) => {
    Page.findById(req.params.idx, (err, editPage) => {
        res.render('./pages/edit.ejs', {page: editPage, user: req.session.user})
    })
})

//SHOW//
pageRouter.get('/:idx', (req,res) => {
    Page.findById(req.params.idx, (err, showPage) => {
        res.render('./pages/show.ejs', {page: showPage})
    })
})

///// EXPORTS /////
module.exports = pageRouter;