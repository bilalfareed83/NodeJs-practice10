const User = require('./models/User');
const Album = require('./models/Albums');
const Tracks = require('./models/Tracks');
const mongoose = require('mongoose');

const signup = async (req, res) => {
  const { firstName, lastName, userName, password } = req.body;

  try {
    const user = await new User({
      firstName,
      lastName,
      userName,
      password,
    }).save();

    res.send(user);
  } catch (error) {
    res.status(404).send({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  try {
    const findUser = await User.findOne({ userName, password });
    if (!findUser) {
      return res.send('user not found');
    }
    res.send('you are logged in');
  } catch (error) {
    res.status(404).send({ success: false, message: err.message });
  }
};

const userUpdate = async (req, res) => {
  const { userName, password, newPassword } = req.body;
  try {
    const findUser = await User.findOne({ userName, password });
    if (!findUser) {
      return res.send('user not found');
    }

    await User.findOneAndUpdate(
      { userName },
      {
        $set: {
          password: newPassword,
        },
      }
    );
    res.send('your password has been changed');
  } catch (error) {
    res.status(404).send({ success: false, message: err.message });
  }
};

const userRemove = async (req, res) => {
  const { userName } = req.body;
  try {
    await User.findOneAndRemove({ userName });
    res.send('user has been removed');
  } catch (error) {
    res.status(404).send({ success: false, message: err.message });
  }
};

const createAlbum = async (req, res) => {
  const { title, singers, tracks } = req.body;

  try {
    const newAlbum = await new Album({
      title,
      singers,
      tracks,
    }).save();

    res.send({ message: 'Ablum created', album: newAlbum });
  } catch (error) {
    res.status(404).send({ success: false, message: err.message });
  }
};

const createTrack = async (req, res) => {
  try {
    const newTrack = await new Tracks({
      ...req.body,
      _id: mongoose.Types.ObjectId(),
    }).save();

    res.send({ message: 'Track created', album: newTrack });
  } catch (error) {
    res.status(404).send({ success: false, message: err.message });
  }
};

const search = async (req, res) => {
  if (req.query.type === 'track') {
    console.log(req.body);
    const searchTrack = await Tracks.find({
      'singer.name': {
        $eq: req.query.name,
      },
    });
    res.send(searchTrack);
  } else {
    res.status(404).send({ message: 'track not found' });
  }
};

const populateAlbumTrack = async (req, res) => {
  try {
    const trackId = '5ecbcf35e32107159893f5c4';

    // const findTrack = await (await Tracks.findById({ id: trackId })).populated(
    //   'albumId'
    // );
    const findAlbum = await Album.findById(trackId).populate('tracks');
    res.send(findAlbum);
  } catch (error) {
    res.status(404).send({ message: 'not found' });
  }
};

module.exports = {
  signup,
  login,
  userUpdate,
  userRemove,
  createAlbum,
  createTrack,
  search,
  populateAlbumTrack,
};
