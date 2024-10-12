require('dotenv').config(); // Load .env file

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Import user routes

const app = express();

// Middleware
app.use(express.json());

// Enable CORS for all routes
app.use(cors());  // This allows all origins by default

// If you want to restrict it to specific origins (e.g., your frontend), use this:
// app.use(cors({ origin: 'http://localhost:3000' }));  // Replace with your frontend URL

console.log("Starting server...");

// MongoDB connection (replace with your URI)
const uri = "mongodb+srv://gedashiv9977:iDdLYcpARlm9bx4o@cluster0.g4ev0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 10000, // Increase timeout to 20 seconds
    socketTimeoutMS: 45000 // Increase socket timeout
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('Error connecting to MongoDB:', err));

// Example route
app.get('/', (req, res) => {
  res.send('API is working');
});

// Use the user routes
app.use('/api/users', userRoutes);  // Add this line to include user-related routes

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
