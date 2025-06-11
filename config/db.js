const mongoose = require('mongoose');
const CONNECTION_URL = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(
        CONNECTION_URL,
         {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

module.exports = connectDB;