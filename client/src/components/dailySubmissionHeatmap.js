import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import './heatmap.css'; // Ensure this CSS file exists
import {Tooltip} from 'react-tooltip';

function DailySubmissionsHeatmap({ dailySubmissions }) {
  // Prepare data in the format the heatmap expects: { date, count }
  const heatmapData = Object.entries(dailySubmissions).map(([date, count]) => ({
    date: new Date(date),  // Convert to Date object if necessary
    count,
  }));

  // Get the current year to show a one-year heatmap
  const currentYear = new Date().getFullYear();

  // Optional: Check if there's any data
  if (heatmapData.length === 0) {
    return <p>No submissions data available.</p>;
  }

  return (
    <div>
      <h3>Daily Submissions Heatmap</h3>
      <CalendarHeatmap
        startDate={new Date(`${currentYear}-01-01`)}  // Start from January 1st of the current year
        endDate={new Date(`${currentYear}-12-31`)}    // End on December 31st of the current year
        values={heatmapData}                          // The data that contains submission count
        classForValue={(value) => {
          if (!value) {
            return 'color-empty';  // No submissions on that day
          }
          return `color-scale-${Math.min(value.count, 4)}`;  // Scale submission count to 4 levels
        }}
        tooltipDataAttrs={(value) => {
          if (!value || !value.date) {
            return { 'data-tip': 'No submissions' };
          }
          return {
            'data-tip': `${value.date.toDateString()}: ${value.count} submissions`, // Format date for tooltip
          };
        }}
        showWeekdayLabels={true}   // Show labels for each weekday
      />
      {/* <Tooltip /> */}
    </div>
  );
}

export default DailySubmissionsHeatmap;
