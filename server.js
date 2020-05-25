const express = require('express');
const app = express();
const api = require('./api');
const middleware = require('./middleware');

app.use(express.json());

app.post('/signup', api.signup);

app.post('/login', api.login);

app.put('/user-update', api.userUpdate);

app.delete('/delete-user', api.userRemove);

app.post('/create-album', middleware.uniqueId, api.createAlbum);

app.post('/create-track', middleware.uniqueId, api.createTrack);

app.get('/search', api.search);

app.get('/searchAlbum', api.populateAlbumTrack);

module.exports = ({ port, cb }) => {
  app.listen(port, cb);
};
