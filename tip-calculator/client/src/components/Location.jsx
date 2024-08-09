import Select from 'react-select';
import { locations } from "../data";

function Location({ selectedLocation, onLocationClick }) {
    return (
        <div>
            <h3>Please select your location</h3>
            <Select
                className="basic-single"
                classNamePrefix="select"
                name="location"
                value={selectedLocation}
                onChange={onLocationClick}
                options={locations}
            />
        </div >
    );
}

export default Location;