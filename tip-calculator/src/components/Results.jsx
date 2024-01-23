function Results({ range, results, onStartAgainBtnClick }) {
    const { startDate, endDate } = range[0];
    const monthOption = { month: 'long' };
    const dateOption = { day: 'numeric' };
    const month = startDate.toLocaleDateString('en-US', monthOption);
    const formattedStartDate = startDate.toLocaleDateString('en-US', dateOption);
    const formattedEndDate = endDate.toLocaleDateString('en-US', dateOption);

    return (
        <div className="wrapper">
            <button className='button' onClick={onStartAgainBtnClick}>Start again</button>
            <div className="results-container">
                <p>
                    From {month} {formattedStartDate} to {formattedEndDate}
                </p>
            </div>
        </div>
    );
}

export default Results;