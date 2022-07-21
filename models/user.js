const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*
////// Intended Framwork /////

UserName: *** User's display name. No restrictions in mind at this time || (String)
UserEmail: *** Primary identifier. Log-in source if able to add || (String)
UserPass: ()CONDITIONAL *** Self-serving  || (String)
UserPath: *** An array of chosen events, pushed in || (Array)

*/

const newUser = new Schema ({
    userName: { type: String, required: true},
    userEmail: { type: String, required: true},
    userPath: { type: Array}
},{timestamps})