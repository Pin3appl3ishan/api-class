const mongoose = require('mongoose');
const CONNECTION_URL = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(
        "mongodb://localhost:27017/mydb",
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