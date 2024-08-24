import React, { useState, useEffect } from 'react';
import { names } from '../../data';
import './Tips.css'

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

function Tips() {
    // check if it is morning for evening
    const [isBeforeFourPM, setIsBeforeFourPM] = useState(false);

    useEffect(() => {
        const checkTime = () => {
            const now = new Date();
            const currentHour = now.getHours();

            if (currentHour <= 16) {
                setIsBeforeFourPM(true);
            } else {
                setIsBeforeFourPM(false);
            }
        };

        checkTime();
        const timer = setInterval(checkTime, 1000);

        return () => clearInterval(timer);
    }, []);

    const [totalTip, setTotalTip] = useState('');
    const [staff, setStaff] = useState([
        { id: 1, name: 'Server 1', percentage: 40 },
        { id: 2, name: 'Server 2', percentage: 30 },
        { id: 3, name: 'Busser', percentage: 20 },
        { id: 4, name: 'Host', percentage: 10 },
    ]);

    const handleTotalTipChange = (e) => {
        setTotalTip(e.target.value);
    };

    const handlePercentageChange = (id, newPercentage) => {
        setStaff(staff.map(member =>
            member.id === id ? { ...member, percentage: Number(newPercentage) } : member
        ));
    };

    const calculateIndividualTip = (percentage) => {
        return totalTip ? (totalTip * percentage / 100).toFixed(2) : '0.00';
    };

    const [currentDate, setCurrentDate] = useState(getDate());
    console.log(new Date());


    return (
        <div className="tip-calculator">
            <h2>Add Tips</h2>
            <div className="input-group">
                {
                    isBeforeFourPM ? (
                        <label htmlFor="totalTip">Total Morning Tip:</label>
                    ) : (
                        <label htmlFor="totalTip">Total Evening Tip:</label>
                    )
                }
                <input
                    type="number"
                    id="totalTip"
                    value={totalTip}
                    onChange={handleTotalTipChange}
                    placeholder="Enter total tip"
                />
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Server</th>
                        <th></th>
                        <th></th>
                        <th>Kitchen</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr>
                        <th>Name</th>
                        <th>Hours</th>
                        <th>Tip Amount</th>
                        <th>Name</th>
                        <th>Hours</th>
                        <th>Tip Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {staff.map((member) => (
                        <tr key={member.id}>
                            <td>{member.name}</td>
                            <td>
                                <input
                                    type="number"
                                    value={member.percentage}
                                    onChange={(e) => handlePercentageChange(member.id, e.target.value)}
                                    min="0"
                                    max="12"
                                />
                            </td>
                            <td>${calculateIndividualTip(member.percentage)}</td>
                            <td>{member.name}</td>
                            <td>
                                <input
                                    type="number"
                                    value={member.percentage}
                                    onChange={(e) => handlePercentageChange(member.id, e.target.value)}
                                    min="0"
                                    max="12"
                                />
                            </td>
                            <td>${calculateIndividualTip(member.percentage)}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Tips;