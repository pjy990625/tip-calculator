import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Tips.css'
// import { names } from '../../data';

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
    const [tables, setTables] = useState([
        {
            id: 1,
            staff: [
                { id: 1, name: 'Server 1', percentage: 40 },
                { id: 2, name: 'Server 2', percentage: 30 },
                { id: 3, name: 'Busser', percentage: 20 },
                { id: 4, name: 'Host', percentage: 10 },
            ]
        },
        {
            id: 2,
            staff: [
                { id: 5, name: 'Server 3', percentage: 50 },
                { id: 6, name: 'Server 4', percentage: 30 },
                { id: 7, name: 'Bartender', percentage: 20 },
            ]
        }
    ]);

    const handleTotalTipChange = (e) => {
        setTotalTip(e.target.value);
    };

    const handlePercentageChange = (tableId, staffId, newPercentage) => {
        setTables(tables.map(table =>
            table.id === tableId
                ? {
                    ...table,
                    staff: table.staff.map(member =>
                        member.id === staffId ? { ...member, percentage: Number(newPercentage) } : member
                    )
                }
                : table
        ));
    };

    const calculateIndividualTip = (percentage) => {
        return totalTip ? (totalTip * percentage / 100).toFixed(2) : '0.00';
    };

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };

    return (
        <div className="tip-calculator">
            <h2>Add Tips</h2>
            <div className="input-group">
                {
                    isBeforeFourPM ? (
                        <>
                            <label htmlFor="totalTip">Total Morning Tip:</label>
                            <input
                                type="number"
                                id="totalTip"
                                value={totalTip}
                                onChange={handleTotalTipChange}
                                placeholder="Enter morning tip"
                            />
                        </>
                    ) : (
                        <>
                            <label htmlFor="totalTip">Total Evening Tip:</label>
                            <input
                                type="number"
                                id="totalTip"
                                value={totalTip}
                                onChange={handleTotalTipChange}
                                placeholder="Enter evening tip"
                            />
                        </>
                    )
                }
            </div>
            <Slider {...settings}>
                {tables.map((table) => (
                    <div key={table.id}>
                        <h3>Table {table.id}</h3>
                        <table>
                            <thead>
                                <tr>
                                    <th>Staff Member</th>
                                    <th>Hours</th>
                                    <th>Tip Amount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {table.staff.map((member) => (
                                    <tr key={member.id}>
                                        <td>{member.name}</td>
                                        <td>
                                            <input
                                                type="number"
                                                value={member.percentage}
                                                onChange={(e) => handlePercentageChange(table.id, member.id, e.target.value)}
                                                min="0"
                                                max="24"
                                            />
                                        </td>
                                        <td>${calculateIndividualTip(member.percentage)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default Tips;