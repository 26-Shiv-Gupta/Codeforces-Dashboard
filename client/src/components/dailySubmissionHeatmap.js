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

        return dateArray;
    };

    // Create an array of dates from November 1, 2023, to October 14, 2024
    const allDates = generateDateRange(previousDate, currentDate);

    // Transform daily submissions into a map for easier lookup
    const submissionsMap = Object.entries(dailySubmissions).reduce((acc, [date, value]) => {
        acc[date] = value; // Map the date to submission count
        return acc;
    }, {});

    // Prepare heatmap data by looping over all dates
    const heatmapData = allDates.map((date) => ({
        date,
        value: submissionsMap[date] || 0, // Use submission value if present, otherwise default to 0
        dayOfWeek: new Date(date).getDay(), // Get the day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
    }));

    // Group the data by month
    const groupByMonth = (data) => {
        const months = {};
        data.forEach(({ date, value, dayOfWeek }) => {

            const month = date.slice(0, 7); // Extract YYYY-MM for grouping
            if (!months[month]) {
                months[month] = new Array(7).fill(null).map(() => []); // Create an array of 7 arrays (one for each day of the week)
            }
            // months[month][dayOfWeek].push({ date, value});
        });
        return months;
    };

    const monthlyHeatmapData = groupByMonth(heatmapData);

    console.log(monthlyHeatmapData)

    return (
        <div className="heatmap-container">
            {Object.entries(monthlyHeatmapData).map(([month, daysByWeekday], monthIndex) => (
                <div key={monthIndex} className="heatmap-month">
                    <h4>{month}</h4>
                    <div className="heatmap-weekdays">
                        {daysByWeekday.map((days, dayOfWeek) => (
                            <div key={dayOfWeek} className="heatmap-day-column">
                                {days.map(({ date, value }) => (
                                    <div key={date} className="heatmap-cell" title={`${date}: ${value}`}>
                                        <span>{value}</span> {/* Display value */}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DailySubmissionHeatmap;
