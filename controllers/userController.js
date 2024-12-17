import User from '../models/User.js';

// Function to get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to get user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate('thoughts').populate('friends');
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to create a user
const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to update a user
const updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId, 
      req.body, 
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to delete a user
const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.userId);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to add a friend to a user's friend list
const addFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or Friend not found' });
    }

    if (!user.friends.includes(friend._id)) {
      user.friends.push(friend._id);
      await user.save();
    }

    if (!friend.friends.includes(user._id)) {
      friend.friends.push(user._id);
      await friend.save();
    }

    res.status(200).json({ message: 'Friend added successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to remove a friend from a user's friend list
const removeFriend = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    const friend = await User.findById(req.params.friendId);

    if (!user || !friend) {
      return res.status(404).json({ message: 'User or Friend not found' });
    }

    user.friends.pull(friend._id);
    await user.save();

    friend.friends.pull(user._id);
    await friend.save();

    res.status(200).json({ message: 'Friend removed successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
};


export { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend };

