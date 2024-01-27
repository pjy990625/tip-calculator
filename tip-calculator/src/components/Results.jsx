import React from 'react';

function Results({ range, results, onBackBtnClick, onRestartBtnClick }) {
    const { startDate, endDate } = range[0];
    const monthNumOption = { month: 'numeric' };
    const monthLongOption = { month: 'long' };
    const dateOption = { day: 'numeric' };
    const monthNum = startDate.toLocaleDateString('en-US', monthNumOption);
    const monthLong = startDate.toLocaleDateString('en-US', monthLongOption);
    const formattedStartDate = startDate.toLocaleDateString('en-US', dateOption);
    const formattedEndDate = endDate.toLocaleDateString('en-US', dateOption);

    // Repeat the <thead> section only when the date changes
    let prevDate = null;
    // Hide result div if there are no results
    const hasResults = results.length > 0;
    // Sort results by date
    const sortedResults = [...results].sort((a, b) => a.date - b.date);

    function aggregateResults(results) {
        // Create an empty object to store the aggregated data
        const aggregatedData = {};

        results.forEach(result => {
            const { name, morningTip, eveningTip, totalHours } = result;
            // Check if the name is already in the aggregatedData object
            if (aggregatedData[name]) {
                // If it exists, update the totalTips and totalHours
                aggregatedData[name].totalTips += morningTip + eveningTip;
                aggregatedData[name].totalHours += totalHours;
            } else {
                // If it doesn't exist, create a new entry
                aggregatedData[name] = {
                    name,
                    totalTips: morningTip + eveningTip,
                    totalHours,
                };
            }
        });
        // Convert the aggregatedData object to an array
        const resultsArray = Object.values(aggregatedData);

        return resultsArray;
    }

    const aggregatedResults = aggregateResults(results);

    return (
        <div className="wrapper">
            <button className='button' onClick={onBackBtnClick}>Back</button>
            <div className="results-container">
                <table className="table">
                    {sortedResults.map((result, key) => {
                        const currentDate = `${result.date}`;
                        const renderThead = currentDate !== prevDate;
                        prevDate = currentDate;

                        return (
                            <React.Fragment key={key} >
                                {renderThead &&
                                    <thead key={`thead-${currentDate}`}>
                                        <tr className='table-highlight'>
                                            <th>{monthNum}/{result.date}</th>
                                            <th>Morning Tip</th>
                                            <th>Evening Tip</th>
                                            <th>Total Tip</th>
                                        </tr>
                                    </thead>}
                                <tbody key={`tbody-${currentDate}`}>
                                    <tr>
                                        <th>{result.name}</th>
                                        <th className='number'>{result.morningTip}</th>
                                        <th className='number'>{result.eveningTip}</th>
                                        <th className='number'>{result.morningTip + result.eveningTip}</th>
                                    </tr>
                                </tbody>
                            </React.Fragment>
                        )
                    })}
                </table>
                {hasResults ?
                    <div className='summary'>
                        <h3>Summary</h3>
                        From {monthLong} {formattedStartDate} to {formattedEndDate},
                        {aggregatedResults.map((result) => {
                            return (
                                <p key={`h4-${result.name}`}>
                                    {result.name} worked for {result.totalHours} hours and earned ${result.totalTips}
                                </p>
                            )
                        })}
                    </div> : <h3>There is nothing to display...</h3>
                }
            </div>
            <button className='button' onClick={onRestartBtnClick}>Restart</button>
        </div >
    );
}

export default Results;