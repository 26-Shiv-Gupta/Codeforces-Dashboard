const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the schema for submission details
const submissionDetailSchema = new Schema({
    problemName: String,
    contestId: Number,
    index: String,
    language: String,
    solvedDate: String,
    verdict: String
});

// Define the schema for contest details
const contestDetailSchema = new Schema({
    contestId: Number,
    contestName: String,
    rank: Number,
    contestDate: String
});

// Define the main user schema
const userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    rating: Number,
    rank: String, // Change rank to String to handle ranks like "legendary grandmaster"
    problemsSolved: Number, // Count of problems solved
    contestCount: Number, // Count of contests
    lastActive: Date, // Last active date
    contests: [contestDetailSchema], // Array of contest details
    submissions: [submissionDetailSchema], // Array of submission details
    dailySubmissions: { type: Map, of: Number } // A map to store the daily submission count
});

// Create the model based on the schema
const User = mongoose.model('User', userSchema);

module.exports = User;
