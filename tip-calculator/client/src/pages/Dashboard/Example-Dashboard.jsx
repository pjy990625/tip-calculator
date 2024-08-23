import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/index';
import './Dashboard.css';

const Dashboard = () => {
    const dispatch = useDispatch();

    const selectedLocation = useSelector(state => state.location.selectedLocation);

    const logoutHandler = () => {
        dispatch(authActions.logout());
    }
    return (
        <div className="dashboard">
            <aside className="sidebar">
                <div className="user-profile">
                    <h3>{selectedLocation}</h3>
                </div>
                <nav>
                    <ul>
                        <li>DeFi</li>
                        <li>Yields</li>
                        <li>DEXes</li>
                        <li>Protocols</li>
                        <li>Settings</li>
                    </ul>
                </nav>
                <button className="logout">Log out</button>
            </aside>

            <main>
                <header>
                    <h1>Welcome back, Esther!</h1>
                    <p>Take a look at the updated DeFi overview</p>
                </header>

                <section className="tvl-overview">
                    <h2>TVL 2022</h2>
                    <div className="tvl-amount">$43,35B <span className="percentage">+13%</span></div>
                    {/* Add chart component here */}
                </section>

                <section className="stats">
                    <div className="change-24h">
                        <h3>Change (24h)</h3>
                        <p className="percentage negative">-4.31%</p>
                        <p>-0.07% this month</p>
                    </div>
                    <div className="maker-dominance">
                        <h3>Maker Dominance</h3>
                        <p className="percentage">15.62%</p>
                        <p>+1.31% this month</p>
                    </div>
                </section>

                <section className="protocols">
                    <h2>Top Protocols</h2>
                    {/* Add pie chart component here */}
                </section>

                <section className="tvl-rankings">
                    <h2>TVL Rankings</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Chains</th>
                                <th>7D Change</th>
                                <th>TVL</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* Add table rows here */}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;