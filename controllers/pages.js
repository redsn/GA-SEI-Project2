////// Dependencies /////
const express = require('express');

///// Router /////
const pageRouter = express.Router();

///// Models /////
const Page = require('../models/page');
const User = require('..//models/user');

///// EXPORTS /////
module.exports = pageRouter;