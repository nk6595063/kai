const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    name: { type: String},
    date: { type: Date, default: Date.now },
    interest: {type:Number, min: 0},
    months: {type:Number, min: 0},
    totalamount: { type: Number, min: 0 },
    vatti: {type:Number, min: 0},
    totalVatti:{type:Number, min: 0},
});

const Note = mongoose.model('Note', noteSchema);

module.exports = { Note };
