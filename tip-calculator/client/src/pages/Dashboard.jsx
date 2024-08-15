import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../components/Header/Header';
import Employees from '../components/Employees/Employee';

function Dashboard() {
    const selectedLocation = useSelector(state => state.location.selectedLocation);
    const [selectedTab, setSelectedTab] = useState('tab1');

    return (
        <div>
            <Header />
            <div>
                <button className='button'>Add Tips</button>
                <button className='button'>Manage Employees</button>
                <button className='button'>View Summary</button>
                <Employees />
            </div>
        </div>
    );
}

export default Dashboard;