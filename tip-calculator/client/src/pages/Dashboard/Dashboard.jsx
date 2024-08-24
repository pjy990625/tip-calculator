import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/index';
import { GrLocation, GrAdd, GrUserManager, GrDocumentText, GrSettingsOption, GrLogout } from 'react-icons/gr';
import Tips from '../../components/Tips/Tips';
import Employees from '../../components/Employees/Employees';
import Summary from '../../components/Summary/Summary';
import Setting from '../../components/Setting/Setting';
import './Dashboard.css';

const tabs = [
    { title: 'Add Tips', icon: <GrAdd />, component: <Tips /> },
    { title: 'Manage Employees', icon: <GrUserManager />, component: <Employees /> },
    { title: 'View Summary', icon: <GrDocumentText />, component: <Summary /> },
    { title: 'Setting', icon: <GrSettingsOption />, component: <Setting /> },
];

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

const Dashboard = () => {
    // show selected location
    const selectedLocation = useSelector(state => state.location.selectedLocation);

    // show selected tab
    const [selectedTab, setSelectedTab] = useState(0);

    function onTabClicked(index) {
        setSelectedTab(index);
    }
    // show current date
    const [currentDate, setCurrentDate] = useState(getDate());

    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="user-profile">
                    <GrLocation />
                    <h3>
                        {selectedLocation}
                    </h3>
                </div>
                <nav className="tab-list">
                    {tabs.map((tab, index) => (
                        <button
                            key={index}
                            className={`tab-button ${selectedTab === index ? 'active' : ''}`}
                            onClick={() => onTabClicked(index)}
                        >
                            {tab.icon}
                            <span className='tab-title'>{tab.title}</span>
                        </button>
                    ))}
                </nav>
                <div className='logout'>
                    <button className="logout-btn" onClick={logoutHandler}>
                        <GrLogout />
                        <span>Log out</span>
                    </button>
                </div>
            </aside>

            <main className="tab-content">
                <header className='header'>
                    <h1>Dashboard</h1>
                    <h1>{currentDate}</h1>
                </header>
                <section>
                    {tabs[selectedTab].component}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;