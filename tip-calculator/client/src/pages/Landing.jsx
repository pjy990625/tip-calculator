import Auth from '../components/Auth/Auth';

function Landing() {
    return (
        <div className="landing-container">
            <div className="left-section">
                <h1>Tip Calculator</h1>
            </div>
            <div className="right-section">
                <div className='wrapper'>
                    <Auth />
                </div>
            </div>
        </div>
    );
}

export default Landing;