import React from 'react';
import './heatmap.css'; // Import the CSS file

const DailySubmissionHeatmap = ({ dailySubmissions }) => {
    // Generate date range from November 1, 2023, to October 14, 2024
    const currentDate = new Date();

    // Calculate the start date (1st of the month 11 months ago)
    const previousDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 1);
    
    const generateDateRange = (startDate, endDate) => {
        const dateArray = [];
        let current = new Date(startDate); // Create a new date object to avoid modifying the original
    
        while (current <= endDate) {
            dateArray.push(current.toISOString().split('T')[0]); // Push the formatted date (YYYY-MM-DD)
            current.setDate(current.getDate() + 1); // Increment the date by 1 day
        }
    
        console.log(dateArray);
    
        return dateArray;
    };


    // Create an array of dates
    const allDates = generateDateRange(startDate, endDate);

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
