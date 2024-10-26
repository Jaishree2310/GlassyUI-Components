const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`Mongo DB is connected at ${conn.connection.host} `);
  } catch (error) {
    console.log(`Mongo DB is not connected  :` + error);
  }
};
module.exports = connectDB;
