////// Dependencies /////
const express = require('express');

///// Router /////
const userRouter = express.Router();

///// Models /////
const Page = require('../models/page');
const User = require('..//models/user');

// INDEX // --> Main Profile Page, render ejs
userRouter.get('/', (req,res) => {
    res.render('./users/index.ejs')
})

// NEW // --> New Profle Page, render ejs
userRouter.get('/new', (req,res) => {
    res.render('./users/new.ejs');
})

// DELETE // --> Delete profile, [delete] to route

// UPDATE // --> Chains off EDIT route, [put] to route

// CREATE // --> Create profile, [posts] to route
userRouter.post('/', (req,res) => {
    User.create(req.body, (err, user) => {
        console.log(req.body, req.body._id)
        res.send(req.body)
    })
})

// EDIT // --> Edit Profile, render ejs

// SHOW // --> Shows **** STORIES *****, render ejs. NOT YET IMPLEMENTED





///// EXPORT *** BOTTOM /////
module.exports = userRouter;