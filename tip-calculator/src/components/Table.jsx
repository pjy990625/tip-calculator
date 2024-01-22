import React from 'react';
import { names } from '../data';

function Table({ range }) {
    const startDate = range[0].startDate;
    const endDate = range[0].endDate;
    // const monthOption = { month: 'short' };
    const dateOption = { day: 'numeric' };
    const dayOption = { weekday: "short" };
    // const month = startDate.toLocaleDateString('en-US', monthOption);
    const startIndex = startDate.toLocaleDateString('en-US', dateOption);
    const endIndex = endDate.toLocaleDateString('en-US', dateOption);

    const datesArray = [];
    let currentDate = new Date(startDate);

    for (let i = +startIndex; i <= endIndex; i++) {
        let day = currentDate.toLocaleDateString('en-US', dayOption);

        datesArray.push({
            date: i,
            day: day
        })

        currentDate.setDate(currentDate.getDate() + 1);
    }

    return (
        <div className='wrapper'>
            <div className='table-container'>
                <table id='table'>
                    {datesArray.map((date, dateKey) =>
                        <React.Fragment key={dateKey} >
                            <thead>
                                <tr>
                                    <th>{date.day} {date.date}</th>
                                    <th>
                                        <label>Morning Tip</label>
                                        <input type="number" id="morningTipInput" defaultValue="0"></input>
                                    </th>
                                    <th>
                                        <label>Evening Tip</label>
                                        <input type="number" id="eveningTipInput" defaultValue="0"></input>
                                    </th>
                                </tr>
                                <tr>
                                    <th>Name</th>
                                    <th>Hours - Morning</th>
                                    <th>Hours - Evening</th>
                                </tr>
                            </thead>
                            <tbody key={`tbody-${dateKey}`}>
                                {names.map((name, nameKey) =>
                                    <tr key={`row-${dateKey}-${nameKey}`}>
                                        <th>{name}</th>
                                        <th>
                                            <input type="number" defaultValue="0" />
                                        </th>
                                        <th>
                                            <input type="number" defaultValue="0" />
                                        </th>
                                    </tr>
                                )}
                            </tbody>
                        </React.Fragment>
                    )}
                </table>
            </div>
            <button>Calculate</button>
        </div>
    );
}

export default Table;