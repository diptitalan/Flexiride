const mongoose = require("mongoose");

const MONGODB_URI = 'mongodb+srv://skyisnotmylimitdev:shubhamepamproject@cluster0.5nd3pca.mongodb.net/flexiride?retryWrites=true&w=majority&appName=Cluster0';

let cachedConnection = null;

async function connectToDatabase() {
  if (cachedConnection) return cachedConnection;

  if (mongoose.connection.readyState >= 1) {
    cachedConnection = mongoose.connection;
    return cachedConnection;
  }

  await mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedConnection = mongoose.connection;
  return cachedConnection;
}

module.exports = connectToDatabase;
