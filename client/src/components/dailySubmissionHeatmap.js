import React from 'react';
import './heatmap.css'; // Import the CSS file

const DailySubmissionHeatmap = ({ dailySubmissions }) => {
    // Generate date range from November 1, 2023, to October 14, 2024
    const currentDate = new Date();
    
    // Calculate the start date (1st of the month 11 months ago)
    const previousDate = new Date(currentDate.getFullYear()-1, currentDate.getMonth(), 1);
    
    const generateDateRange = (currentDate, previousDate) => {
        const dateArray = [];
        let startDate = previousDate;

        while (startDate <= currentDate) {
            dateArray.push(currentDate.toISOString().split('T')[0]); // Format: YYYY-MM-DD
            currentDate.setDate(currentDate.getDate() + 1); // Increment date by 1 day
        }

        console.log(dateArray);

        return dateArray;
    };

    generateDateRange(currentDate, previousDate);

    // // Create an array of dates
    // const allDates = generateDateRange(startDate, endDate);

    // // Transform daily submissions into a map for easier lookup
    // const submissionsMap = Object.entries(dailySubmissions).reduce((acc, [date, value]) => {
    //     acc[date] = value; // Map date to submission count
    //     return acc;
    // }, {});

    // // Prepare heatmap data
    // const heatmapData = allDates.map(date => ({
    //     date,
    //     value: submissionsMap[date] || 0, // Get the submission count or default to 0
    // }));

    return (
        <div className="heatmap">
            {/* {heatmapData.map(({ date, value }) => (
                <div key={date} className="heatmap-cell" title={`${date}: ${value}`}>
                    <span>{value}</span>
                </div>
            ))} */}
        </div>
    );
};

export default DailySubmissionHeatmap;
