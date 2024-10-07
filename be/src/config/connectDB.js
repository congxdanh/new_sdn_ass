const mongoose = require("mongoose");

require("dotenv").config();

const uri = process.env.MONGO_DB;

const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("Connect database successful");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
