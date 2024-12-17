import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/UserRoutes.js'; 
import thoughtRoutes from './routes/thoughtRoutes.js'; 

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Use the user routes
app.use('/api/users', userRoutes);

// Use the thought routes 
app.use('/api/thoughts', thoughtRoutes);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/socialNetworkDB', {
});

mongoose.connection.once('open', () => console.log('Connected to MongoDB'));

// Start the server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));


