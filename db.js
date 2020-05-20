const mongoose = require('mongoose');

module.exports = ({ MONGO_URI }) => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => {
      console.log('Database connected');
    })
    .catch(() => {
      console.log('Database not connect');
    });
};
