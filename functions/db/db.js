import mongoose from 'mongoose';

// Initialize connection to database
// const dbUrl =
//   process.env.MONGODB_SECRET || 'mongodb://localhost:27017/locallibrary';
const dbUrl =
  'mongodb://admin:locallibraryadmin@librarydatabase-shard-00-00-piwbt.gcp.mongodb.net:27017,librarydatabase-shard-00-01-piwbt.gcp.mongodb.net:27017,librarydatabase-shard-00-02-piwbt.gcp.mongodb.net:27017/SECURDE?ssl=true&replicaSet=LibraryDatabase-shard-0&authSource=admin&retryWrites=true&w=majority';
const dbOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  // useUnifiedTopology: false,
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
