import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function Landing({ range, onRangeClick, onNextClick }) {
    return (
        <div className="landing-container">
            <div className="left-section">
                <h1>Tip Calculator</h1>
            </div>
            <div className="right-section">
                {/* Calendar */}
                <div className='wrapper'>
                    <div className='calendar-container'>
                        <h3>Please select the period</h3>
                        <DateRange
                            editableDateInputs={true}
                            onChange={onRangeClick}
                            moveRangeOnFirstSelection={false}
                            ranges={range}
                        />
                    </div>
                    <button className='button' onClick={onNextClick}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default Landing;