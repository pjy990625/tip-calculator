import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/index';
import { GrLocation, GrAdd, GrUserManager, GrDocumentText, GrLogout } from 'react-icons/gr';
import Tips from '../../components/Tips/Tips';
import Employees from '../../components/Employees/Employees';
import Summary from '../../components/Summary/Summary';
import './Dashboard.css';

const tabs = [
    { title: 'Add Tips', icon: <GrAdd />, component: <Tips /> },
    { title: 'Manage Employees', icon: <GrUserManager />, component: <Employees /> },
    { title: 'View Summary', icon: <GrDocumentText />, component: <Summary /> },
];

const Dashboard = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }

    const selectedLocation = useSelector(state => state.location.selectedLocation);

    // show selected tab
    const [selectedTab, setSelectedTab] = useState(0);

    function onTabClicked(index) {
        setSelectedTab(index);
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
                <header>
                    <h1>Dashboard</h1>
                    <p>Take a look at the updated overview</p>
                </header>
                <section>
                    {tabs[selectedTab].component}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;