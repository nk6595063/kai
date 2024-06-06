const mongoose = require('mongoose');

const pill_Schema = new mongoose.Schema({
    statusMessage:{ type: String},
    payAmount:{type: Number},
    noteId:{type:String}
});

const Pill = mongoose.model('pill', pill_Schema);

module.exports = { Pill};