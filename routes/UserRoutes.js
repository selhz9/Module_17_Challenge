import express from 'express';
import { getUsers, createUser, deleteUser, updateUser, addFriend, removeFriend, getUserById } from '../controllers/userController.js';

const router = express.Router();

// GET all users
router.get('/', getUsers);

// GET user by ID
router.get('/:userId', getUserById);

// POST a new user 
router.post('/', createUser); 

// DELETE a user by userId
router.delete('/:userId', deleteUser);

// PUT (or update) a user by userId
router.put('/:userId', updateUser);

// POST to add a friend to a user's friend list
router.post('/:userId/friends/:friendId', addFriend);

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', removeFriend);

export default router;