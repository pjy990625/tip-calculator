import React from 'react';
import { names } from '../data';

function Table({ range, onShiftsChange, onTipsChange }) {
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
                                        <input
                                            type="number"
                                            defaultValue="0"
                                            onChange={(e) =>
                                                onTipsChange(date.date, "morningTip", e.target.value)
                                            }
                                        />
                                    </th>
                                    <th>
                                        <label>Evening Tip</label>
                                        <input
                                            type="number"
                                            defaultValue="0"
                                            onChange={(e) =>
                                                onTipsChange(date.date, "eveningTip", e.target.value)
                                            }
                                        />
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
                                            <input
                                                type="number"
                                                defaultValue="0"
                                                onChange={(e) =>
                                                    onShiftsChange(date.date, name, "morningHours", e.target.value)
                                                }
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="number"
                                                defaultValue="0"
                                                onChange={(e) =>
                                                    onShiftsChange(date.date, name, "eveningHours", e.target.value)
                                                }
                                            />
                                        </th>
                                    </tr>
                                )}
                            </tbody>
                        </React.Fragment>
                    )}
                </table>
            </div>
            <input type="button" value="Calculate" />
            {/* <button>Calculate</button> */}
        </div>
    );
}

export default Table;