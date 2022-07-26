const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
///// Basic Framework for Page /////

EventName: Event name/identifier. keep as a string for reference purposes || (String)
EventTimer: Time taken for event. Forces climax/conclusion when certain amount is reached || (Number)
ownership: userEmail OR Unique identifier. Used for permission to modify || (String)
createdBy: userName, links with next line || (String)
private: createdBy = userName OR Anonymous || (Boolean)

*/

const newPage = new Schema ({
    eventName: { type: String, required: true}, // now Chapter
    eventTimer: { type: Number }, // may be removed
    belongsTo: { type: String }, // IN USE
    createdBy: { type: String }, // now Author
    content: { type: String},
    private: { type: Boolean, default: false} 
}, {timestamps: true})

const Page = mongoose.model('Page', newPage);

module.exports = Page;