////// Dependencies /////
const express = require('express');
const bcrypt = require('bcrypt');

///// Router /////
const userRouter = express.Router();

///// Models /////
const Page = require('../models/page');
const User = require('..//models/user');

// LOG IN //
userRouter.get('/login', (req,res) => {
    res.send('placeholder');
})

// INDEX // --> Main Profile Page, render ejs
userRouter.get('/', (req,res) => {
    res.render('./users/index.ejs')
})

// NEW // --> New Profle Page, render ejs
userRouter.get('/new', (req,res) => {
    res.render('./users/new.ejs');
})

// DELETE // --> Delete profile, [delete] to route
userRouter.delete('/:idx', (req,res) => {
    User.findByIdAndDelete(req.body.idx, (err, deleteUser) => {
        res.redirect('/');
    })
})

// UPDATE // --> Chains off EDIT route, [put] to route
useRouter.put('/:idx', (req,res) => {
    User.findByIdAndUpdate(req.body.idx, (err, updateUser) => {
        res.redirect(`/user/${req.params.id}`)
    })
})

// CREATE // --> Create profile, [posts] to route
userRouter.post('/', (req,res) => {
    User.create(req.body, (err, user) => {
        console.log(req.body, req.body._id)
        res.send(req.body)
    })
})

// EDIT // --> Edit Profile, render ejs
userRouter.get('/:idx/edit', (req,res) => {
    User.findById(req.params.idx, (err, editUser) => {
        res.render('./users/edit.ejs');
    })
})

// SHOW // --> Shows **** STORIES *****, render ejs. NOT YET IMPLEMENTED





///// EXPORT *** BOTTOM /////
module.exports = userRouter;