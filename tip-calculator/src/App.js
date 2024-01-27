import './App.css';
import { useState } from 'react';
import Landing from './components/Landing';
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
      const existingTipIndex = preTips.findIndex((tip) => tip.date === date);

      if (existingTipIndex !== -1) {
        return preTips.map((tip, index) =>
          index === existingTipIndex ? { ...tip, [morningOrEvening]: +amount } : tip
        );
      }
      // If tip does not exist, add new tip
      let newTip = {
        date: date,
        morningTip: morningOrEvening === "morningTip" ? +amount : 0,
        eveningTip: morningOrEvening === "eveningTip" ? +amount : 0,
      };

      return [...preTips, newTip];
    });
  }

  function handleShifts(date, name, morningOrEvening, hours) {
    setShifts((prevShifts) => {
      // If shift already exists, update the corresponding hours
      const existingShiftIndex =
        prevShifts.findIndex((shift) => shift.date === date && shift.name === name);

      if (existingShiftIndex !== -1) {
        return prevShifts.map((shift, index) =>
          index === existingShiftIndex ? { ...shift, [morningOrEvening]: +hours } : shift
        );
      }

      // If the shift does not exist, add a new shift
      let newShift = {
        date: date,
        name: name,
        morningHours: morningOrEvening === "morningHours" ? +hours : 0,
        eveningHours: morningOrEvening === "eveningHours" ? +hours : 0,
      };

      return [...prevShifts, newShift];
    });
  }

  function handleResults(date, name, morningTip, eveningTip, totalHours) {
    setResults((prevResult) => {
      let result = {
        date: date,
        name: name,
        morningTip: morningTip,
        eveningTip: eveningTip,
        totalHours: totalHours,
      }

      return [...prevResult, result];
    });
  }

  function calculateTips(tips, shifts) {
    function calculateRate(tip, shifts, rateType) {
      const tipAmount = tip[`${rateType}Tip`] * 0.6;
      const totalHours = shifts.reduce((total, shift) =>
        total + shift[`${rateType}Hours`], 0);

      return tipAmount / totalHours || 0;
    }

    function processShift(shift, morningRate, eveningRate) {
      const morningTip = Math.trunc(morningRate * shift.morningHours);
      const eveningTip = Math.trunc(eveningRate * shift.eveningHours);
      const totalHours = shift.morningHours + shift.eveningHours;

      handleResults(shift.date, shift.name, morningTip, eveningTip, totalHours);
    }

    tips.forEach((tip) => {
      const shiftsByDate = shifts.filter((shift) =>
        shift.date === tip.date &&
        (shift.morningHours !== 0 ||
          shift.eveningHours !== 0)
      );
      const morningRate = calculateRate(tip, shiftsByDate, 'morning');
      const eveningRate = calculateRate(tip, shiftsByDate, 'evening');

      shiftsByDate.forEach((shift) => {
        if (morningRate === 0) {
          processShift(shift, 0, eveningRate);
        } else if (eveningRate === 0) {
          processShift(shift, morningRate, 0);
        } else {
          processShift(shift, morningRate, eveningRate);
        }
      });
    });
  }

  // Check if any input fields for tips or hours are empty
  function checkIfEmpty(tips, shifts) {
    if (tips.length === 0) {
      alert("Please enter proper tips!");
      return true;
    }

    return tips.some((tip) => {
      const shiftsByDate = shifts.filter(
        (shift) => shift.date === tip.date);
      const totalMorningHours = shiftsByDate.reduce(
        (hours, shift) => hours + shift.morningHours, 0);
      const totalEveningHours = shiftsByDate.reduce(
        (hours, shift) => hours + shift.eveningHours, 0);

      if ((tip.morningTip > 0 && totalMorningHours === 0) ||
        (tip.eveningTip > 0 && totalEveningHours === 0)) {
        alert("Please enter proper hours!");
        return true;
      } else if ((tip.morningTip === 0 && totalEveningHours > 0) ||
        (tip.eveningTip === 0 && totalEveningHours > 0)) {
        alert("Please enter proper tips!");
        return true;
      }
      return false;
    });
  }


  function handleNextBtnClick() {
    setNextBtnClicked(true);
  }

  function handleBackToCalendarBtnClick() {
    setNextBtnClicked(false);
  }

  function handleCalculateBtnClick() {
    if (checkIfEmpty(tips, shifts)) {
      return
    } else {
      calculateTips(tips, shifts);
      setCalculateBtnClicked(true);
    }
  }

  function handleBackToTableBtnClick() {
    setResults([]);
    setCalculateBtnClicked(false);
  }

  function handleRestartBtnClick() {
    setRange([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]);
    setTips([]);
    setShifts([]);
    setResults([]);
    setNextBtnClicked(false);
    setCalculateBtnClicked(false);
  }

  console.log(tips);
  console.log(shifts);
  console.log(results);

  return (
    <div className="App">
      {!nextBtnClicked &&
        <Landing
          range={range}
          onRangeClick={handleRange}
          onNextClick={handleNextBtnClick}
        />
      }
      {(nextBtnClicked && !calculateBtnClicked) &&
        <Table
          range={range}
          tips={tips}
          shifts={shifts}
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
          onBackBtnClick={handleBackToTableBtnClick}
          onRestartBtnClick={handleRestartBtnClick}
        />
      }
    </div>
  );
}

export default App;