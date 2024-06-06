const express = require('express');
const mongoose = require('mongoose');
const  { Note}  =require('../schema');
const  { Empty }  =require('../schema1');
const  { Pill }  =require('../pill');
const { dbUrl } = require("../dbms");
mongoose.connect(dbUrl);

const mongoo = {
  date: async (dat) => {
    try {
     await Empty.create(dat);
    } catch (err) {
      console.error('Error in MongoDB function:', err);
      return { status: 'failed', message: err.message };
    }
  },

 full: async (full) => {
    try {
      const result = await Note.create(full);
      return result;
    } catch (err) {
      console.error('Error in MongoDB function:', err);
      return { status: 'failed', message: err.message };
    }
  },

  dateget: async (startDate, endDate) => {
    try {
        const notes = await Note.find({
          currentDate: {
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

pill : async (id) => {
  try {
    const result = await Pill.find({noteId:{$eq :id}});

    if (!result) {
      return { status: 'failed', message: 'ID not available' };
    }

    return result;
  } catch (err) {
    console.error('Error in MongoDB function:', err);
    return { status: 'failed', message: err.message };
  }
},

pay: async (id, payAmount) => {
  try {
    
    const note = await Note.findById(id);
    console.log(note);

    // If note not found, return a failure message
    if (!note) {
      return { status: 'failed', message: 'Note not found' };
    }

    if (note.totalamount < payAmount) {
      return { status: 'failed', message: 'your amound is too long .' };
    }

    console.log(note.totalamount);

    // Calculate the remaining amount after payment
    const remainingAmount = note.totalamount - payAmount;

    // Update the note with the remaining amount
    await Note.findByIdAndUpdate(id, { totalamount: remainingAmount });

    // Determine the payment status
    let statusMessage;
    switch (true) {
      case note.monthlypay === payAmount:
        statusMessage = "success";
        break;
      case note.monthlypay > payAmount:
        statusMessage = "pending";
        break;
      case note.monthlypay < payAmount:
        statusMessage = "next month already pay";
        break;
      default:
        statusMessage = "Unknown payment status";
    }

    const result = await Pill.create({ statusMessage, payAmount, noteId:note._id});

    return { status: 'success', remainingAmount, message: statusMessage };
  } catch (err) {
    console.error('Error fetching or updating note:', err);
    return { status: 'failed', message: err.message };
  }
}
}

module.exports = mongoo;
