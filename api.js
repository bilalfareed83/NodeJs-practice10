const User = require('./models/User');

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

module.exports = {
  signup,
  login,
  userUpdate,
  userRemove,
};
