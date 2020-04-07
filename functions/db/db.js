import mongoose from 'mongoose';

// Initialize connection to database
const dbUrl =
  process.env.MONGODB_SECRET || 'mongodb://localhost:27017/locallibrary';
const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};
const ERROR = 'error';
// Set DB from mongoose connection
mongoose.connect(dbUrl, dbOptions);
const db = mongoose.connection;
db.on(ERROR, err => {
  // eslint-disable-next-line no-console
  console.log(err);
});

export default db;
