import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux';
import { locationActions, authActions } from '../../store/index';
import { useAllLocations } from '../../hooks/useLocation';
import './Login.css'

function Login() {
    // Get all locations from database
    const { data: locations, error: locationsError, isLoading: locationsLoading } = useAllLocations();

    // Transform branches data into the format expected by react-select
    const locationOptions = locations ? locations.map(location => ({
        value: location.location_id,
        label: location.location_name
    })) : [];
    
    // Store selected location using redux
    const selectedLocation = useSelector(state => state.selectedLocation);
    const dispatch = useDispatch();

    const handleLocationChange = (selectedLocation) => {
        dispatch(locationActions.updateLocation(selectedLocation.value));
    }

    const loginHandler = (event) => {
        event.preventDefault();

        dispatch(authActions.login());
    }

    return (
        <div className="login-box">
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <div className="user-box">
                    {locationsLoading ? (
                        <p>Loading locations...</p>
                    ) : locationsError ? (
                        <p>Error loading locations: {locationsError.message}</p>
                    ) : (
                        <Select
                            className="basic-single"
                            name="location"
                            placeholder="Select your location..."
                            value={selectedLocation}
                            onChange={handleLocationChange}
                            options={locationOptions}
                        />
                    )}
                </div>
                <div className="user-box">
                    <input type="password" name="" />
                    {/* <input type="password" name="" required /> */}
                    <label>Password</label>
                </div>
                <button className='login-button'>Login</button>
            </form>
        </div>
    );
}

export default Login;