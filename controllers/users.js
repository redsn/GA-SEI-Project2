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
// LOG OUT //
userRouter.get('/logout', (req,res) => {
    req.session.destroy(() => {
        res.redirect('/user/login');
    })
})
// POST //
userRouter.post('/login', (req,res) => {
    User.findOne({ userEmail: req.body.userEmail }, '+password', (err, findUser) => {
        if(!findUser) return res.send(req.body);
        console.log(`Req: ${req.body.userPassword}, Database: ${findUser.userPassword}, hashcheck: ${bcrypt.compareSync(req.body.userPassword, findUser.userPassword)}`)
        console.log(`Req: ${req.body.userPassword}, Database: ${bcrypt.hashSync(req.body.userPassword, bcrypt.genSaltSync(SALT))}`)
        if(!bcrypt.compareSync(req.body.userPassword, findUser.userPassword)){
        return res.send('bcryinvalid')};
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
    if(req.body.userPassword.length < 6){
        return res.render('./user/new.ejs', {err:'Please enter a valid password'})
    }
    console.log(req.body.userPassword)
    const hash = bcrypt.hashSync(req.body.userPassword, bcrypt.genSaltSync(SALT));
    req.body.userPassword = hash;
    User.create(req.body, (err, newUser) => {
        if(err){
            res.render('./user/new.ejs', {err: 'Login data invalid'})
        } else {
            req.session.newUser = newUser._id;
            console.log(newUser)
            res.redirect(`/user/home`)
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
userRouter.get('/home', (req,res) => {
    User.findById(req.session.user, (err, showUser) => {
        // console.log(req.session.user);
       res.render('./users/profile.ejs', {user: showUser}); 
    })
})





///// EXPORT *** BOTTOM /////
module.exports = userRouter;