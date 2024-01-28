import React, { useState } from 'react';
import Summary from './Summary';

function Results({ range, results, onBackBtnClick, onRestartBtnClick }) {
    const [summaryBtnClicked, setSummaryBtnClicked] = useState(false);
    const { startDate } = range[0];
    const monthNumOption = { month: 'numeric' };
    const monthNum = startDate.toLocaleDateString('en-US', monthNumOption);

    // Sort results by date
    const sortedResults = [...results].sort((a, b) => a.date - b.date);
    // Repeat the <thead> section only when the date changes
    let prevDate = null;

    function handleSummaryBtnClicked() {
        setSummaryBtnClicked((prev) => !prev);
    }

    return (
        <div className='mobile-wrapper'>
            <div className="wrapper">
                <button className='button' onClick={onBackBtnClick}>Back</button>
                <div className="results-container">
                    {summaryBtnClicked ?
                        <Summary range={range} results={results} /> :
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
                    }
                </div>
                <div>
                    {summaryBtnClicked ?
                        <button className='button' onClick={handleSummaryBtnClicked}>Table</button> :
                        <button className='button' onClick={handleSummaryBtnClicked}>Summary</button>
                    }
                    <button className='button' onClick={onRestartBtnClick}>Restart</button>
                </div>
            </div >
        </div>
    );
}

export default Results;