import Select from 'react-select';
import { locations } from "../data";
import { useSelector, useDispatch } from 'react-redux';
import { locationActions } from '../store/index';

function Location() {
    const dispatch = useDispatch();
    const selectedLocation = useSelector(state => state.selectedLocation);

    const handleLocationChange = (selectedLocation) => {
        dispatch(locationActions.updateLocation(selectedLocation.value));
    }

    return (
        <div>
            <h3>Please select your location</h3>
            <Select
                className="basic-single"
                classNamePrefix="select"
                name="location"
                value={selectedLocation}
                onChange={handleLocationChange}
                options={locations}
            />
        </div >
    );
}

export default Location;