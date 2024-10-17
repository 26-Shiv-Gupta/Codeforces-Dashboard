import React from 'react';
import './contest.css';
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';

function UserGraphs({ contests }) {

  // Prepare contest data for the line chart, keeping only the latest 20 contests
  console.log(contests)
  const latestContests = contests.slice(-20).map(contest => ({
    name: contest.contestName,
    rank: contest.rank,
  }));

  return (
    <div>

      <h3>Contest Ranks (Latest 20 Contests - Line Chart)</h3>
      <LineChart
        width={600}
        height={300}
        data={latestContests}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey=" " />
        
        {/* Reverse Y-axis by setting domain and reversed to true */}
        <YAxis reversed={true} domain={['auto', 'auto']} />
        
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="rank" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </div>
  );
}

export default UserGraphs;
