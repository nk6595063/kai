const mongoose = require('mongoose');
const dbName = "kairasi";
const dbUrl = `mongodb://127.0.0.1:27017/${dbName}`;

// Connect to the database
mongoose.connect(dbUrl)
.then(() => {console.log(`Connected to MongoDB database: ${dbName}`);
})
.catch((err) => {
  console.error('Error connecting to MongoDB', err);
});

module.exports = {dbName, dbUrl ,mongoose};
