import mongoose from 'mongoose';

// Initialize connection to database
const dbUrl =
  'mongodb+srv://admin:locallibraryadmin@librarydatabase-piwbt.gcp.mongodb.net/SECURDE?retryWrites=true&w=majority';
const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions);
const db = mongoose.connection;
// eslint-disable-next-line no-console
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export default db;
