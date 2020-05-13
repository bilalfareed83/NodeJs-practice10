require('dotenv').config();

console.log(process.env.NODE_ENV, process.env.MONGO_URI);

module.exports = {
  PORT: process.env.PORT || 3001,
  NODE_ENV: process.env.NODE_ENV || deveploment,
  MONGO_URI: process.env.MONGO_URI,
};
