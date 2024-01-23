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
  const [tips, setTips] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [results, setResults] = useState([]);
  const [nextBtnClicked, setNextBtnClicked] = useState(false);
  const [calculateBtnClicked, setCalculateBtnClicked] = useState(false);

  function handleRange(item) {
    setRange([item.selection]);
  }

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
  }

  function handleResults(date, name, morningTip, eveningTip, totalHours) {
    setResults((prevResult) => {
      let result = {};
      result = {
        date: date,
        name: name,
        morningTip: morningTip,
        eveningTip: eveningTip,
        totalHours: totalHours
      }

      return [...prevResult, result];
    });
  }

  function calculateTips(tips, shifts) {
    tips.forEach((tip) => {
      // Divide tip by percentage
      const morningTip = tip.morningTip * 0.6;
      const eveningTip = tip.eveningTip * 0.6;
      // Calculate total hours for a corresponding date by time
      let shiftsByDate = shifts.filter((shift) => shift.date === tip.date);
      let totalMorningHours = 0;
      let totalEveningHours = 0;
      
      shiftsByDate.forEach((shift) => {
        totalMorningHours = totalMorningHours + shift.morningHours;
        totalEveningHours = totalEveningHours + shift.eveningHours;
      });
      // Calculate how much money in dollars per hour
      const morningRate = morningTip / totalMorningHours;
      const eveningRate = eveningTip / totalEveningHours;
      // Store results in the state
      shiftsByDate.forEach((shift) => {
        const morningTip = morningRate * shift.morningHours;
        const eveningTip = eveningRate * shift.eveningHours;
        const totalHours = shift.morningHours + shift.eveningHours;

        handleResults(shift.date, shift.name, morningTip, eveningTip, totalHours);
      });
    })
  }

  function handleNextBtnClick() {
    setNextBtnClicked(true);
  }

  function handleBackToCalendarBtnClick() {
    setNextBtnClicked(false);
  }

  function handleCalculateBtnClick() {
    calculateTips(tips, shifts);
    setCalculateBtnClicked(true);
  }

  function handleStartAgainBtnClick() {
    setRange([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]);
    setNextBtnClicked(false);
    setCalculateBtnClicked(false);
  }

  console.log(tips);
  console.log(shifts);
  console.log(results);

  return (
    <div className="App">
      <Header />
      <div className='wrapper'>
        {!nextBtnClicked &&
          <Calendar
            range={range}
            onRangeClick={handleRange}
            onNextClick={handleNextBtnClick}
          />
        }
        {(nextBtnClicked && !calculateBtnClicked) &&
          <Table
            range={range}
            onBackBtnClick={handleBackToCalendarBtnClick}
            onCalculateBtnClick={handleCalculateBtnClick}
            onTipsChange={handleTips}
            onShiftsChange={handleShifts}
            onResults={handleResults}
          />
        }
        {calculateBtnClicked &&
          <Results
            range={range}
            results={results}
            onStartAgainBtnClick={handleStartAgainBtnClick}
          />
        }
      </div>
    </div>
  );
}

export default App;