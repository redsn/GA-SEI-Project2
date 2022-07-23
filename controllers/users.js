////// Dependencies /////
const express = require('express');
const bcrypt = require('bcrypt');
const SALT = 10;

///// Router /////
const userRouter = express.Router();

///// Models /////
const Page = require('../models/page');
const User = require('..//models/user');

// LOG IN //
// GET//
userRouter.get('/login', (req,res) => {
    res.render('./users/login.ejs')
})
// POST //
userRouter.post('/login', (req,res) => {
    User.findOne({ email: req.body.userEmail }, '+password', (err, findUser) => {
        if(!findUser) return res.send('invalid');
        if(!bcrypt.compareSync(req.body.userPassword, findUser.userPassword)) return res.send('invalid');
        req.session.user = findUser._id
        res.redirect('/')
    })
})

// INDEX // --> Main Profile Page, render ejs
userRouter.get('/profile', (req,res) => {
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
userRouter.put('/:idx', (req,res) => {
    User.findByIdAndUpdate(req.body.idx, (err, updateUser) => {
        res.redirect(`/user/${req.params.id}`)
    })
})

// CREATE // --> Create profile, [posts] to route
/// BCRYPT WIP ///
userRouter.post('/register', (req,res) => {
    if(req.body.userPassword < 6){
        return res.render('./user/new.ejs', {err:'Please enter a valid password'})
    }
    const hash = bcrypt.hashSync(req.body.userPassword, bcrypt.genSaltSync(SALT));
    req.body.userPassword = hash;
    User.create(req.body, (err, newUser) => {
        if(err){
            res.render('./user/new.ejs', {err: 'Login data invalid'})
        } else {
            req.session.newUser = newUser._id;
            // res.send(req.body)
            res.redirect(`/user/${newUser._id}`)
        }
    })
})
// userRouter.post('/register', (req,res) => {
//     User.create(req.body, (err, user) => {
//         console.log(req.body, req.body._id)
//         res.redirect(``)
//     })
// })

// EDIT // --> Edit Profile, render ejs
userRouter.get('/:idx/edit', (req,res) => {
    User.findById(req.params.idx, (err, editUser) => {
        res.render('./users/edit.ejs');
    })
})

// SHOW // --> Shows **** STORIES *****, render ejs. NOT YET IMPLEMENTED
userRouter.get('/:idx', (req,res) => {
    User.findById(req.params.idx, (err, showUser) => {
       res.render('./users/show.ejs', {user: showUser}); 
    })
})





///// EXPORT *** BOTTOM /////
module.exports = userRouter;