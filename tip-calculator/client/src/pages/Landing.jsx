import Login from '../components/Login/Login';

function Landing() {
    return (
        <div className="landing-container">
            <div className="left-section">
                <h1>Tip Calculator</h1>
            </div>
            <div className="right-section">
                <div className='wrapper'>
                    <Login />
                </div>
            </div>
        </div>
    );
}

export default Landing;