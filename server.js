// Dependencies
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const pageRouter = require('./controllers/pages')
const userRouter = require('./controllers/users')
const bookRouter = require('./controllers/books')
const session = require('express-session');

// Usage
const app = express();
app.use(express.urlencoded({extended: false}));

// Server Config
const PORT = 4000; /// Change with .env var later
const { DATABASE_CONNECT, secret } = process.env;
mongoose.connect(DATABASE_CONNECT)
const db = mongoose.connection;
db.on('error', (err) => {
    console.error(`Connection Error via MongoDB: ${err.message}`)
})
db.on('connected', () => {
    console.log(`Connection established`)
})
db.on('disconnected', () => {
    console.log('disconnected')
})
////////////////

//Middleware//
app.use(session({
    secret: process.env.secret,
    resave: false,
    saveUninitialized: false
}))
app.use(express.static('public'));
app.use(methodOverride('_method'));

app.use(async function(req, res, next){
    if (req.session && req.session.user) {
        const user = await require('./models/user').findById(req.session.user);
        res.locals.user = user;
        // console.log(res.locals.user);
    } else {
        res.locals.user = null;
    }
    next();
})

// MAIN PAGE // *** WIP
app.get('/', (req,res) => {
    res.render('./server/place.ejs');
})
///////////////





//////// Mount Routers ///////
app.use('/user', userRouter); // 'user' route is temp. TBD 
app.use('/pages', pageRouter); // Placeholder, not yet implemented
app.use('/book', bookRouter); // 'book' route

/// Listener ///
app.listen(PORT, console.log(`Application loaded on port: ${PORT}`));