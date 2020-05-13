const express = require('express');
const app = express();
const api = require('./api');

app.use(express.json());

app.post('/signup', api.signup);

app.post('/login', api.login);

app.put('/user-update', api.userUpdate);

app.delete('/delete-user', api.userRemove);

module.exports = ({ port, cb }) => {
  app.listen(port, cb);
};
