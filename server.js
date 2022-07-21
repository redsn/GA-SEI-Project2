// Dependencies
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const pageRouter = require('./controllers/pages')
const userRouter = require('./controllers/users')

// Usage
const app = express();
app.use(express.urlencoded({extended: false}));

// Server Config
const PORT = 4000; /// Change with .env var later
//////// mongodb connections here later /////////

// MAIN PAGE // *** WIP
app.get('/', (req,res) => {
    // res.send('Here I am, once again. I\'m torn into pieces')
    res.render('./server/index.ejs');
})
///////////////





//////// Mount Routers ///////
app.use('/user', userRouter) // 'user' route is temp. TBD 
// app.use('/user', pageRouter) // Placeholder, not yet implemented

/// Listener ///
app.listen(PORT, console.log(`Application loaded on port: ${PORT}`));