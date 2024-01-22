import './App.css';
import { useState } from 'react';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Table from './components/Table';
import Results from './components/Results';

function App() {
  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  ]);

  const [shifts, setShifts] = useState([]);

  const [tips, setTips] = useState([
    {
      date: new Date(),
      morningTip: 0,
      eveningTip: 0,
    }
  ]);

  function handleRange(item) {
    setRange([item.selection]);
  };

  function handleShifts(date, name, morningOrEvening, hours) {
    setShifts((prevShifts) => {
      // If the shift already exists, update the corresponding hours
      const existingShiftIndex =
        prevShifts.findIndex((shift) => shift.date === date && shift.name === name);

      if (existingShiftIndex !== -1) {
        return prevShifts.map((shift, index) => {
          if (index === existingShiftIndex) {
            return {
              ...shift,
              [morningOrEvening]: +hours,
            };
          } else {
            return shift;
          }
        });
      }
      // If the shift does not exist, add a new shift
      let newShift = {};

      switch (morningOrEvening) {
        case "morningHours":
          newShift = {
            date: date,
            name: name,
            morningHours: +hours,
            eveningHours: 0,
          }
          break;
        case "eveningHours":
          newShift = {
            date: date,
            name: name,
            morningHours: 0,
            eveningHours: +hours,
          }
          break;
        default:
          break;
      }

      return [...prevShifts, newShift];
    });
  };

  function handleTips(date, morningOrEvening, amount) {
    
  }

  console.log(shifts)

  return (
    <div className="App">
      <Header />
      <div className='wrapper'>
        <Calendar range={range} onRangeClick={handleRange} />
        <Table range={range} shifts={shifts} onShiftsChange={handleShifts} />
        <Results />
      </div>
    </div>
  );
}

export default App;
