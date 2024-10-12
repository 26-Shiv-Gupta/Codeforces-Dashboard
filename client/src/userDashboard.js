import React, { useState } from 'react';
import axios from 'axios';


function UserDashboard() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    try {
      // Call the backend route that fetches user data and saves it to MongoDB
      const response = await axios.get(`http://localhost:5000/api/users/fetch/${username}`);
      setUserData(response.data); // Set the user data from the backend

      setError(''); // Clear any previous errors
    } catch (err) {
      setError(`No User exists in Codeforces with username "${username}"`);
      setUserData({});  
    }
  };

  return (
    <div>
      <h1>Codeforces User Dashboard</h1>
      <input
        type="text"
        placeholder="Enter Codeforces Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={fetchUserData}>Fetch User Data</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {userData && Object.keys(userData).length > 0 && (
        <div>
          <h2>User Profile</h2>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>Rank:</strong> {userData.rank}</p>
          <p><strong>Rating:</strong> {userData.rating}</p>
          <p><strong>Problems Solved:</strong> {userData.problemsSolved}</p>
          <p><strong>Contest Count:</strong> {userData.contestCount}</p>
          <p><strong>Last Active:</strong> {new Date(userData.lastActive).toDateString()}</p>

          <h3>Contests:</h3>
          <ul>
            {userData.contests.map((contest, index) => (
              <li key={index}>
                {contest.contestName} - Rank: {contest.rank}, Date: {contest.contestDate}
              </li>
            ))}
          </ul>

          <h3>Daily Submissions:</h3>
          <ul>
            {Object.entries(userData.dailySubmissions).map(([date, count]) => (
              <li key={date}>{date}: {count} submissions</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
