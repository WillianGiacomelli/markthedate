require("dotenv").config();

module.exports = {
  MONGO_DB_URI: process.env.MONGO_DB_URI,
  JWT_TOKEN: process.env.JWT_TOKEN,
};
