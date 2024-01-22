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

  function handleRange(item) {
    setRange([item.selection]);
  };

  return (
    <div className="App">
      <Header />
      <div className='wrapper'>
        <Calendar range={range} onRangeClick={handleRange} />
        <Table range={range} />
        <Results />
      </div>
    </div>
  );
}

export default App;
