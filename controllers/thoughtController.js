import Thought from '../models/Thought.js';

// Function to create a new thought
const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json(err); 
  }
};

// Function to update a thought by its ID
const updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );

    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    res.json(updatedThought);
  } catch (err) {
    res.status(500).json(err); 
  }
};

// Function to delete a thought by its ID
const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
    
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    
    res.json({ message: 'Thought deleted successfully', thought });
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to get all thoughts
const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to get a single thought by its ID
const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.thoughtId);
    
    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

// Function to create a reaction for a specific thought
const createReaction = async (req, res) => {
  try {
    const { thoughtId } = req.params; 
    const { reactionBody, username } = req.body; 

    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    const newReaction = {
      reactionBody,
      username,
    };

    thought.reactions.push(newReaction);

    await thought.save();

    res.status(201).json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to create reaction', error: err });
  }
};

// Function to delete a reaction from a thought by reactionId
const deleteReaction = async (req, res) => {
  try {
    const { thoughtId, reactionId } = req.params; 

    const thought = await Thought.findById(thoughtId);

    if (!thought) {
      return res.status(404).json({ message: 'Thought not found' });
    }

    thought.reactions = thought.reactions.filter(
      (reaction) => reaction.reactionId.toString() !== reactionId
    );

    await thought.save();

    res.status(200).json(thought);
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete reaction', error: err });
  }
};

export { createThought, updateThought, deleteThought, getAllThoughts, getThoughtById, createReaction, deleteReaction };
