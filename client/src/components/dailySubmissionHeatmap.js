import React from 'react';
import './heatmap.css'; // Import the CSS file

const DailySubmissionHeatmap = ({ dailySubmissions }) => {
    // Generate date range from November 1, 2023, to October 14, 2024
    const currentDate = new Date();

    // Calculate the start date (1st of the month 11 months ago)
    const previousDate = new Date(currentDate.getFullYear() - 1, currentDate.getMonth(), 2);

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
                months[month] = [];
            }
            if (months[month].length === 0) {
                for (let i = 0; i < dayOfWeek; i++) {
                    months[month].push(null);
                }
            }
            months[month].push({ date, value });
        });
        return months;
    };

    const monthlyHeatmapData = groupByMonth(heatmapData);

    const getGlowClass = (value) => {
        if (value === 0) {
            return 'no-activity'; // No submissions, no glow
        } else if (value <= 2) {
            return 'low-activity';
        } else if (value <= 5) {
            return 'medium-activity';
        } else if (value <= 10) {
            return 'high-activity';
        } else {
            return 'very-high-activity'; // For the highest activity
        }
    };
    const getMonthName = (month) => {
        const date = new Date(month + '-01'); // Create a new Date object
        return date.toLocaleString('default', { month: 'short'}); // Get the full month name and year
    };


    return (
        <div className="heatmap-container">
            {Object.entries(monthlyHeatmapData).map(([month, days], monthIndex) => (
                <div key={monthIndex} className="heatmap-month">
                    <div className="heatmap-grid">
                        {/* Chunk the days into weeks of 7 days each */}
                        {Array.from({ length: Math.ceil(days.length / 7) }, (_, weekIndex) => (
                            <div key={weekIndex} className="heatmap-week">
                                {days.slice(weekIndex * 7, weekIndex * 7 + 7).map((day, dayIndex) => (
                                    day ? ( // Only render the cell if 'day' is not null
                                        <div
                                            key={dayIndex}
                                            className={`heatmap-cell ${getGlowClass(day.value)}`}
                                            title={`${day.date}: ${day.value}`}
                                        >
                                            {/* <span>{day.value}</span> */}
                                        </div>
                                    ) : (
                                        <div key={dayIndex} className="heatmap-cell blank"></div> // Render a blank cell if 'day' is null
                                    )
                                ))}
                            </div>
                        ))}
                    </div>
                    <h4>{getMonthName(month)}</h4>
                </div>
            ))}
        </div>
    );
};

export default DailySubmissionHeatmap;
