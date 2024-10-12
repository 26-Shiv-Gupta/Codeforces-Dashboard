const express = require('express');
const axios = require('axios');
const User = require('../models/user'); // Import the User model
const router = express.Router();

// Route to fetch Codeforces user data and save it to MongoDB
router.get('/fetch/:username', async (req, res) => {
    const { username } = req.params;

    try {
        let user = await User.findOne({ username });

        if (user) {
            // If data exists in the database, return the stored data
            console.log('Data found in the database, returning cached data');
            return res.json(user);
        }

        // If user data is not found in MongoDB, fetch from Codeforces API
        console.log('Data not found in database, fetching from Codeforces API');
        // Fetch user data from Codeforces API (user.info)
        const userResponse = await axios.get(`https://codeforces.com/api/user.info?handles=${username}`);
        if (userResponse.data.status !== "OK") {
            return res.status(404).json({ message: 'User not found on Codeforces' });
        }
        const userData = userResponse.data.result[0];

        // Fetch submissions to calculate problems solved
        const submissionsResponse = await axios.get(`https://codeforces.com/api/user.status?handle=${username}`);
        const submissions = submissionsResponse.data.result;

        // Track unique problems solved and collect submission details
        const problemsSolvedSet = new Set();
        const submissionDetails = [];
        const dailySubmissions = {};

        submissions.forEach(submission => {
            const submissionDate = new Date(submission.creationTimeSeconds * 1000).toISOString().split('T')[0]; // YYYY-MM-DD format

            // Count daily submissions
            dailySubmissions[submissionDate] = (dailySubmissions[submissionDate] || 0) + 1;

            if (submission.verdict === 'OK') {
                const problemId = `${submission.problem.contestId}-${submission.problem.index}`;
                problemsSolvedSet.add(problemId);

                submissionDetails.push({
                    problemName: submission.problem.name,
                    contestId: submission.problem.contestId,
                    index: submission.problem.index,
                    language: submission.programmingLanguage,
                    solvedDate: submissionDate,
                    verdict: submission.verdict
                });
            }
        });
        const problemsSolved = problemsSolvedSet.size;

        // Fetch contest history to calculate contest count and rank/date per contest
        const contestResponse = await axios.get(`https://codeforces.com/api/user.rating?handle=${username}`);
        const contestDetails = contestResponse.data.result.map(contest => ({
            contestId: contest.contestId,
            contestName: contest.contestName,
            rank: contest.rank,
            contestDate: new Date(contest.ratingUpdateTimeSeconds * 1000).toISOString().split('T')[0]
        }));
        const contestCount = contestDetails.length;

            // If user doesn't exist, create a new entry
            if (!user){
            user = new User({
                username: userData.handle,
                firstName: userData.firstName,
                lastName: userData.lastName,
                rating: userData.rating,
                rank: userData.rank,
                problemsSolved: problemsSolved, // Initialize problems solved
                contestCount: contestCount, // Initialize contest count
                lastActive: new Date(userData.lastOnlineTimeSeconds * 1000),
                contests: contestDetails,
                submissions: submissionDetails,
                dailySubmissions: dailySubmissions
            });
        }

        // Save the user data to MongoDB
        await user.save();

        // Send response to client
        res.json(user);
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).json({ message: 'Failed to fetch user data from Codeforces', error: err.message });
    }
});

module.exports = router; // Make sure to export the router
