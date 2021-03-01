const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  mongoUri: `mongodb+srv://admin:${process.env.MONGO_DB_PASSWORD}@cluster0.j17rw.mongodb.net/test?retryWrites=true`,
  port: process.env.PORT || 5000
};
