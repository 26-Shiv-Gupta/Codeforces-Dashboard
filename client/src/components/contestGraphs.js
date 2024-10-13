import React from 'react';
import {XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar } from 'recharts';

function UserGraphs({contests}) {

  // Prepare contest data for the bar chart
  const contestData = contests.map(contest => ({
    name: contest.contestName,
    rank: contest.rank,
  }));

  return (
    <div>

      <h3>Contest Ranks (Bar Chart)</h3>
      <BarChart
        width={600}
        height={300}
        data={contestData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="rank" fill="#82ca9d" />
      </BarChart>
    </div>
  );
}

export default UserGraphs;
