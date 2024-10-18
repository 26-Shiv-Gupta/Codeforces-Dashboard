import React, { useState } from 'react';
import axios from 'axios';
import UserGraphs from './components/contestGraphs';
import DailySubmissionsHeatmap from './components/dailySubmissionHeatmap';
import './App.css'; // Make sure to import your CSS

function UserDashboard() {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState({});
  const [error, setError] = useState('');

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/fetch/${username}`);
      setUserData(response.data);
      setError('');
    } catch (err) {
      setError(`No User exists in Codeforces with username "${username}"`);
      setUserData({});
    }
  };

  return (
    <div className="container">
      <div className='logo'>
        <img src='https://seeklogo.com/images/C/codeforces-logo-AA1F2FF3CF-seeklogo.com.png'></img>
      </div>
      <div className='search-box'>
        <input
          type="text"
          placeholder="Enter Codeforces Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={fetchUserData}>Fetch User Data</button>
      </div>
      

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="profile-container">
        <div className="user-personal-data user-data-container">
          {userData && Object.keys(userData).length > 0 && (
            <>
              <div className="profile-item"><strong>User id:</strong> {userData._id}</div>
              <div className="profile-item"><strong>Username:</strong> {userData.username}</div>
              <div className="profile-item"><strong>First Name:</strong> {userData.firstName}</div>
              <div className="profile-item"><strong>Last Name:</strong> {userData.lastName}</div>
              <div className="profile-item"><strong>Rating:</strong> {userData.rating}</div>
              <div className="profile-item"><strong>Rank:</strong> {userData.rank}</div>
              <div className="profile-item"><strong>Problems Solved:</strong> {userData.problemsSolved}</div>
              <div className="profile-item"><strong>Contest Count:</strong> {userData.contestCount}</div>
              <div className="profile-item"><strong>Last Active:</strong> {new Date(userData.lastActive).toDateString()}</div>
            </>
          )}
        </div>
        
        {userData && Object.keys(userData).length > 0 && (
            <div className="dashboard-section">
              <div className="dashboard-card user-data-container">
                <h3>Daily Submissions Heatmap</h3>
                <DailySubmissionsHeatmap dailySubmissions={userData.dailySubmissions} />
              </div>
              <div className="dashboard-card user-data-container">
                <h3>Contest Graph</h3>
                <UserGraphs contests={userData.contests} />
              </div>
            </div>
        )}
      </div>
    </div>
  );
}

export default UserDashboard;
