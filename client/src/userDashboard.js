import React, { useState } from 'react';
import axios from 'axios';
import UserGraphs from './components/contestGraphs';
import DailySubmissionsHeatmap from './components/dailySubmissionHeatmap'


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
          <p><strong>User id:</strong> {userData._id}</p>
          <p><strong>Username:</strong> {userData.username}</p>
          <p><strong>first name:</strong> {userData.firstName}</p>
          <p><strong>last name:</strong> {userData.lastName}</p>
          <p><strong>Rating:</strong> {userData.rating}</p>
          <p><strong>Rank:</strong> {userData.rank}</p>
          <p><strong>Problems Solved:</strong> {userData.problemsSolved}</p>
          <p><strong>Contest Count:</strong> {userData.contestCount}</p>
          <p><strong>Last Active:</strong> {new Date(userData.lastActive).toDateString()}</p>

          {/* Add UserGraphs component */}
          <h3>Daily Submissions Heatmap</h3>
          <DailySubmissionsHeatmap dailySubmissions={userData.dailySubmissions} />
          <UserGraphs contests={userData.contests}/>
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
