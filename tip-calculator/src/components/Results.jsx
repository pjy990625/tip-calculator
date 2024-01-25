import React from 'react';

function Results({ range, results, onStartAgainBtnClick }) {
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

    function aggregateResults(results) {
        // Create an empty object to store the aggregated data
        const aggregatedData = {};

        results.forEach(result => {
            const { name, morningTip, eveningTip, totalHours } = result;
            // Check if the name is already in the aggregatedData object
            if (aggregatedData[name]) {
                // If it exists, update the totalTips and totalHours
                aggregatedData[name].totalTips += Math.trunc(morningTip) + Math.trunc(eveningTip);
                aggregatedData[name].totalHours += totalHours;
            } else {
                // If it doesn't exist, create a new entry
                aggregatedData[name] = {
                    name,
                    totalTips: Math.trunc(morningTip) + Math.trunc(eveningTip),
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
            <button className='button' onClick={onStartAgainBtnClick}>Start again</button>
            <div className="results-container">
                <table className="table">
                    {results.map((result, key) => {
                        const currentDate = `${result.date}`;
                        const renderThead = currentDate !== prevDate;
                        prevDate = currentDate;

                        return (
                            <React.Fragment key={key} >
                                {renderThead &&
                                    <thead key={`thead-${currentDate}`}>
                                        <tr>
                                            <td>{monthNum}/{result.date}</td>
                                            <td>Morning Tip</td>
                                            <td>Evening Tip</td>
                                            <td>Total Tip</td>
                                        </tr>
                                    </thead>}
                                <tbody key={`tbody-${currentDate}`}>
                                    <tr>
                                        <td>{result.name}</td>
                                        <td>{`${Math.trunc(result.morningTip)}`}</td>
                                        <td>{`${Math.trunc(result.eveningTip)}`}</td>
                                        <td>{`${Math.trunc(result.morningTip) + Math.trunc(result.eveningTip)}`}</td>
                                    </tr>
                                </tbody>
                            </React.Fragment>
                        )
                    })}
                </table>
                <div>
                    From {monthLong} {formattedStartDate} to {formattedEndDate},
                    {aggregatedResults.map((result) => {
                        return (
                            <h4 key={`h4-${result.name}`}>{result.name} worked for {result.totalHours} hours and earned ${result.totalTips}</h4>
                        )
                    })}

                </div>
            </div>
        </div >
    );
}

export default Results;