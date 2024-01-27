import React from 'react';
import { names } from '../data';

function Table({ range, tips, shifts, onBackBtnClick, onCalculateBtnClick, onTipsChange, onShiftsChange }) {
    const { startDate, endDate } = range[0];
    const dateOption = { day: 'numeric' };
    const dayOption = { weekday: "short" };
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
            <button className='button' onClick={onBackBtnClick}>Back</button>
            <div className='table-container'>
                <table className='table'>
                    {datesArray.map((date, dateKey) =>
                        <React.Fragment key={dateKey} >
                            <thead>
                                <tr className='table-highlight'>
                                    <th rowSpan={2}>{date.day} {date.date}</th>
                                    <th>Morning Tip</th>
                                    <th>Evening Tip</th>
                                </tr>
                                <tr>
                                    <th>
                                        <input
                                            type="number"
                                            value={tips.find((tip) => tip.date === date.date)?.morningTip || 0}
                                            onChange={(e) =>
                                                onTipsChange(date.date, "morningTip", e.target.value)
                                            }
                                            // Add this line to select the text on click
                                            onClick={(e) => e.target.select()}
                                            // Set to 0 if the input is empty
                                            onBlur={(e) => {
                                                if (e.target.value === "") {
                                                    onTipsChange(date.date, "morningTip", 0);
                                                }
                                            }}
                                        />
                                    </th>
                                    <th>
                                        <input
                                            type="number"
                                            value={tips.find((tip) => tip.date === date.date)?.eveningTip || 0}
                                            onChange={(e) =>
                                                onTipsChange(date.date, "eveningTip", e.target.value)
                                            }
                                            onClick={(e) => e.target.select()}
                                            onBlur={(e) => {
                                                if (e.target.value === "") {
                                                    onTipsChange(date.date, "eveningTip", 0);
                                                }
                                            }}
                                        />
                                    </th>
                                </tr>
                                <tr className='table-highlight'>
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
                                                value={shifts.find(
                                                    (shift) => shift.date === date.date && shift.name === name)?.morningHours || 0
                                                }
                                                onChange={(e) => {
                                                    if (+(e.target.value) >= 0)
                                                        onShiftsChange(date.date, name, "morningHours", e.target.value)
                                                }}
                                                onClick={(e) => e.target.select()}
                                                onBlur={(e) => {
                                                    if (e.target.value === "") {
                                                        onShiftsChange(date.date, name, "morningHours", 0);
                                                    }
                                                }}
                                            />
                                        </th>
                                        <th>
                                            <input
                                                type="number"
                                                value={shifts.find(
                                                    (shift) => shift.date === date.date && shift.name === name)?.eveningHours || 0
                                                }
                                                onChange={(e) => {
                                                    if (+(e.target.value) >= 0)
                                                        onShiftsChange(date.date, name, "eveningHours", e.target.value)
                                                }}
                                                onClick={(e) => e.target.select()}
                                                onBlur={(e) => {
                                                    if (e.target.value === "") {
                                                        onShiftsChange(date.date, name, "eveningHours", 0);
                                                    }
                                                }}
                                            />
                                        </th>
                                    </tr>
                                )}
                            </tbody>
                        </React.Fragment>
                    )}
                </table>
            </div>
            <button className='button' onClick={onCalculateBtnClick}>Calculate</button>
        </div>
    );
}

export default Table;