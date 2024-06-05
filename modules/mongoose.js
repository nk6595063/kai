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


// amoundshow:async function (dat) {
//   try {
//     const newNote = new Total(dat);
  
//     const result = await newNote.save();                                  
//     return result;
//   } catch (err) {
//       return res.send(err);
//   }
// },

// gettotal : async function (dat) {
//   try {
//     const result = await Total.findOne({ name: { $eq: dat } });
//     console.log(result);
//     if (!result) {
//       throw new Error('Total not found');
//     }
//     const totalAmount = result.totalamound;
//     return result;
//   } catch (err) {
//     console.error('Error fetching total:', err);
//     return { status: 'failed', message: err.message };
//   }
// },


  }

module.exports = mongoo;
