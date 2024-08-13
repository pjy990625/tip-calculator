import Header from '../components/Header';
import { useSelector, useDispatch } from 'react-redux';

function Dashboard() {
    const selectedLocation = useSelector(state => state.location.selectedLocation);

    return (
        <div>
            <Header />
            <p>You're in {selectedLocation}</p>
            <div>
                {/* <button className='button' onClick={onBackBtnClick}>Back</button> */}
                <button className='button'>View Summary</button>
                <button className='button'>Manage Employees</button>
                <button className='button'>Add Tips</button>
            </div>
        </div>
    );
}

export default Dashboard;