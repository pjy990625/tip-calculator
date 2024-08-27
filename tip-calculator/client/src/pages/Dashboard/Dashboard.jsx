import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/index';
import { GrLocation, GrMoney, GrUserManager, GrDocumentText, GrSettingsOption, GrLogout } from 'react-icons/gr';
import Tips from '../../components/Tips/Tips';
import Employees from '../../components/Employees/Employees';
import Summary from '../../components/Summary/Summary';
import Setting from '../../components/Setting/Setting';
import { useLocationById } from '../../hooks/useLocation';
import { useServers, useKitchenStaff } from '../../hooks/useEmployee';
import './Dashboard.css';

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

const Dashboard = () => {
    // Get the selected location from database
    const selectedLocationId = useSelector(state => state.location.selectedLocation);
    const { data: location, error: locationError, isLoading: locationLoading } = useLocationById(selectedLocationId);

    // Fetch servers and kitchen staff using custom hooks
    const { data: servers, error: serverError, isLoading: serverLoading } = useServers(selectedLocationId);
    const { data: kitchenStaff, error: kitchenError, isLoading: kitchenLoading } = useKitchenStaff(selectedLocationId);

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
                    {locationLoading ? (
                        <p>Location loading...</p>
                    ) : locationError ? (
                        <p>Error loading location: {locationError.message}</p>
                    ) : (
                        <h3>{location.location_name}</h3>
                    )}
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
                    {(serverLoading || kitchenLoading) ? (
                        <p>Loading ...</p>
                    ) : (serverError) ? (
                        <p>Error loading servers: {serverError.message}</p>
                    ) : (kitchenError) ? (
                        <p>Error loading kitchen staff: {kitchenError.message}</p>
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
