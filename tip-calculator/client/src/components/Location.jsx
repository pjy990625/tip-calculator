import React, { useState } from 'react';
import Select from 'react-select';
import { locations } from "../data";

function Location() {
    const [selectedLocation, setSelectedLocation] = useState(locations[0]);

    const handleChange = (selectedOption) => {
        setSelectedLocation(selectedOption);
    }
    return (
        <div>
            <h3>Please select your location</h3>
            <Select
                className="basic-single"
                classNamePrefix="select"
                defaultValue={locations[0]}
                name="location"
                value={selectedLocation}
                onChange={handleChange}
                options={locations}
            />
        </div >
    );
}

export default Location;