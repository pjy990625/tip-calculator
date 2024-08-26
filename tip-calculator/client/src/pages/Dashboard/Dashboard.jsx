import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/index';
import { GrLocation, GrMoney, GrUserManager, GrDocumentText, GrSettingsOption, GrLogout } from 'react-icons/gr';
import Tips from '../../components/Tips/Tips';
import Employees from '../../components/Employees/Employees';
import Summary from '../../components/Summary/Summary';
import Setting from '../../components/Setting/Setting';
import './Dashboard.css';
import { useServers, useKitchenStaff } from '../../hooks/useEmployee';

const tabs = [
    { title: 'Tips', icon: <GrMoney />, component: (props) => <Tips {...props} /> },
    { title: 'Employees', icon: <GrUserManager />, component: (props) => <Employees {...props} /> },
    { title: 'Summary', icon: <GrDocumentText />, component: (props) => <Summary {...props} /> },
    { title: 'Setting', icon: <GrSettingsOption />, component: (props) => <Setting {...props} /> },
];

function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
}

// Function to convert location names
const getApiLocation = (location) => {
    switch (location) {
        case 'Port Coquitlam':
            return 'poco';
        case 'Langley':
            return 'langley';
        default:
            return '';
    }
};

const Dashboard = () => {
    // Show the selected location
    const selectedLocation = useSelector(state => state.location.selectedLocation);
    const apiLocation = getApiLocation(selectedLocation);

    // Fetch servers and kitchen staff using custom hooks
    const { data: servers, error: serverError, isLoading: serverLoading } = useServers(apiLocation);
    const { data: kitchenStaff, error: kitchenError, isLoading: kitchenLoading } = useKitchenStaff(apiLocation);

    // Show selected tab
    const [selectedTab, setSelectedTab] = useState(0);

    function onTabClicked(index) {
        setSelectedTab(index);
    }

    // Show current date
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
                    <h3>{selectedLocation}</h3>
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
                    {serverLoading ? (
                        <p>Loading servers...</p>
                    ) : serverError ? (
                        <p>Error loading servers: {serverError.message}</p>
                    ) : (
                        tabs[selectedTab].component({
                            servers: servers,
                            kitchenStaff: kitchenStaff,
                        })
                    )}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
