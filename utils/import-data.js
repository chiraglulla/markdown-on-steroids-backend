// const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Document = require('../models/document');

dotenv.config({ path: '../.env' });
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then(() => console.log('Database connected.'));

// const importData = async () => {
//   try {
//     await Document.create(tours);
//     console.log('Data Loaded');
//   } catch (err) {
//     console.log(err);
//   }
//   process.exit();
// };

const deleteData = async () => {
  try {
    await Document.deleteMany();
    console.log('Data deleted');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// if (process.argv[2] === '--import') importData();
if (process.argv[2] === '--delete') deleteData();
console.log(process.argv);
