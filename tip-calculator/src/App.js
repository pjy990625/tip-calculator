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
  const [tips, setTips] = useState([]);

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
        case "morningTip":
          newShift = {
            date: date,
            name: name,
            morningHours: +hours,
            eveningHours: 0,
          }
          break;
        case "eveningTip":
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
    setTips((preTips) => {
      // If tip already exists, update the corresponding amount
      const existingTipIndex =
        preTips.findIndex((tip) => tip.date === date);

      if (existingTipIndex !== -1) {
        return preTips.map((tip, index) => {
          if (index === existingTipIndex) {
            return {
              ...tip,
              [morningOrEvening]: +amount,
            };
          } else {
            return tip;
          }
        });
      }
      // If tip does not exist, add new tip
      let newTip = {};

      switch (morningOrEvening) {
        case "morningTip":
          newTip = {
            date: date,
            morningTip: +amount,
            eveningTip: 0,
          }
          break;
        case "eveningTip":
          newTip = {
            date: date,
            morningTip: 0,
            eveningTip: +amount,
          }
          break;
        default:
          break;
      }

      return [...preTips, newTip];
    });
  }

  console.log(shifts);
  console.log(tips);

  return (
    <div className="App">
      <Header />
      <div className='wrapper'>
        <Calendar range={range} onRangeClick={handleRange} />
        <Table range={range} onShiftsChange={handleShifts} onTipsChange={handleTips} />
        <Results />
      </div>
    </div>
  );
}

export default App;
