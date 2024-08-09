function Dashboard({ location, onBackBtnClick }) {
    return (
        <div>
            <p>You're in {location}</p>
            <div>
                <button className='button' onClick={onBackBtnClick}>Back</button>
                <button className='button'>View Summary</button>
                <button className='button'>Manage Employees</button>
                <button className='button'>Add Tips</button>
            </div>
        </div>
    );
}

export default Dashboard;