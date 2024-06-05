const express = require('express');
const mongoose = require('mongoose');
const  { Note}  =require('../schema');
const  { Empty }  =require('../schema1');
const { dbUrl } = require("../dbms");
mongoose.connect(dbUrl);

const mongoo = {
  date: async (dat) => {
    try {
      const result = await Empty.create(dat);
      return result;
    } catch (err) {
      console.error('Error in MongoDB function:', err);
      return { status: 'failed', message: err.message };
    }
  },

 full: async (empty) => {
    try {
      const full = await Note.create(empty);
      return full;
    } catch (err) {
      console.error('Error in MongoDB function:', err);
      return { status: 'failed', message: err.message };
    }
  },

  
  dateget: async (startDate, endDate) => {
    try {
        const notes = await Note.find({
          date: {
            $gt: new Date(startDate),
            $lt: new Date(endDate)
        }
        });    
        return notes;
    }catch (err) {
        console.error('Error fetching notes:', err);
        return { status: 'failed', message: err.message };
    }
},

amoundshow: async (name) => {
  try {
    const result = await Note.find({ name: { $eq: name } });

    if (!result || result.length === 0) {
      return `false`;
    }

    console.log(result);
    console.log(result[0]['totalamound']);

    return result[0]['totalamound'];
  } catch (err) {
    console.error('Error in MongoDB function:', err);
    return { status: 'failed', message: err.message };
  }
},

pay: async (name, pay) => {
  try {
    // Fetch the note based on the provided name
    const notes = await Note.find({ name });
    console.log(notes);

    if (notes.length === 0) {
      return { status: 'failed', message: 'Note not found' };
    }

    // Assuming you want to update the first note found with the given name
    const note = notes[0];

    // Calculate the remaining amount after payment
    const remainingAmount = note.totalamount - pay;

    // Update the note's total amount in the database
    await Note.updateOne({ name: name }, { totalamount: remainingAmount });

    console.log(note);
    return remainingAmount;
  } catch (err) {
    console.error('Error fetching or updating note:', err);
    return { status: 'failed', message: err.message };
  }
}


  }

module.exports = mongoo;
