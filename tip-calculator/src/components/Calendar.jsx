import { DateRange } from 'react-date-range';

import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

function Calendar({ range, onRangeClick }) {
    return (
        <div className='calendar-container'>
            <DateRange
                editableDateInputs={true}
                onChange={onRangeClick}
                moveRangeOnFirstSelection={false}
                ranges={range}
            />
        </div>
    );
}

export default Calendar;