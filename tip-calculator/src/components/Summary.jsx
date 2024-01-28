function Summary({ range, results }) {
    const { startDate, endDate } = range[0];
    const monthLongOption = { month: 'long' };
    const dateOption = { day: 'numeric' };
    const monthLong = startDate.toLocaleDateString('en-US', monthLongOption);
    const formattedStartDate = startDate.toLocaleDateString('en-US', dateOption);
    const formattedEndDate = endDate.toLocaleDateString('en-US', dateOption);

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
        </div>
    );
}

export default Summary;