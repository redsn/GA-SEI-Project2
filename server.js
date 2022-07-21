// Dependencies
require('dotenv').config();
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');

// Usage
const app = express();
app.use(express.urlencoded({extended: false}));

// Server Config
const PORT = 4000; /// Change with .env var later
//////// mongodb connections here later /////////









/// Listener ///
app.listen(PORT, console.log(`Application loaded on port: ${PORT}`));