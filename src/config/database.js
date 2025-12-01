const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:QBUcqNcCpSE8BOEP@namaste-nodejs.uvbiizm.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
