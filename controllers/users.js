////// Dependencies /////
const express = require('express');

///// Router /////
const userRouter = express.Router();

///// Models /////
const Page = require('../models/page');
const User = require('..//models/user');

// INDEX // --> Main Profile Page, render ejs

// NEW // --> New Profle Page, render ejs

// DELETE // --> Delete profile, [delete] to route

// UPDATE // --> Chains off EDIT route, [put] to route

// CREATE // --> Create profile, [posts] to route

// EDIT // --> Edit Profile, render ejs

// SHOW // --> Shows **** STORIES *****, render ejs. NOT YET IMPLEMENTED





///// EXPORT *** BOTTOM /////
module.exports = userRouter;