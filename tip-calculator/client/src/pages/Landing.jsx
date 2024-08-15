import Location from '../components/Location';

function Landing({ selectedLocation, onLocationClick, onNextClick }) {
    return (
        <div className="landing-container">
            <div className="left-section">
                <h1>Tip Calculator</h1>
            </div>
            <div className="right-section">
                <div className='wrapper'>
                    <Location selectedLocation={selectedLocation} onLocationClick={onLocationClick} />
                    <button className='button' onClick={onNextClick}>Next</button>
                </div>
            </div>
        </div>
    );
}

export default Landing;