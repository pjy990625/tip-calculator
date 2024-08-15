import Select from 'react-select'
import { useSelector, useDispatch } from 'react-redux';
import { locationActions, authActions } from '../../store/index';
import { locations } from "../../data";
import './Auth.css'

function Auth() {
    const dispatch = useDispatch();

    const selectedLocation = useSelector(state => state.selectedLocation);

    const handleLocationChange = (selectedLocation) => {
        dispatch(locationActions.updateLocation(selectedLocation.value));
    }

    const loginHandler = (event) => {
        event.preventDefault();

        dispatch(authActions.login());
    }

    return (
        <div class="login-box">
            <h2>Login</h2>
            <form onSubmit={loginHandler}>
                <div class="user-box">
                    <Select
                        className="basic-single"
                        name="location"
                        placeholder="Select your location..."
                        value={selectedLocation}
                        onChange={handleLocationChange}
                        options={locations}
                    />
                </div>
                <div class="user-box">
                    <input type="password" name="" />
                    {/* <input type="password" name="" required /> */}
                    <label>Password</label>
                </div>
                <button className='login-button'>Login</button>
            </form>
        </div>
    );
}

export default Auth;