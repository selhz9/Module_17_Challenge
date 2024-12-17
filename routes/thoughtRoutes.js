import express from 'express';
import { createThought, updateThought, deleteThought, getAllThoughts, getThoughtById, createReaction, deleteReaction } from '../controllers/thoughtController.js';

const router = express.Router();

// POST to create a new thought
 router.post('/', createThought);

 // PUT to update a thought
 router.put('/:thoughtId', updateThought);

 // DELETE to remove a thought
 router.delete('/:thoughtId', deleteThought);

 // GET to get all thoughts
 router.get('/', getAllThoughts);

 // GET one thought by id
 router.get('/:thoughtId', getThoughtById);

 // POST to create a new reaction for a thought
router.post('/:thoughtId/reactions', createReaction);

// DELETE to remove a reaction from a thought by reactionId
router.delete('/:thoughtId/reactions/:reactionId', deleteReaction);

export default router;