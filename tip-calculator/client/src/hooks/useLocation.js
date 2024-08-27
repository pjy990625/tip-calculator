import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Axios function to fetch all locations
const fetchAllLocations = async () => {
    const response = await axios.get(`http://localhost:8000/api/locations`);

    return response.data;
};

// Axios function to fetch the selected location by id
const fetchLocationById = async (location_id) => {
    const response = await axios.get(`http://localhost:8000/api/locations/${location_id}`, {
        params: { location_id: location_id } // Pass location id as a parameter
    });

    return response.data;
};

// Custom hook for fetching all locations
export const useAllLocations = () => {
    return useQuery({
        queryKey: ['locations'],
        queryFn: () => fetchAllLocations(),
    });
};

// Custom hook for fetching the selected location
export const useLocationById = (location_id) => {
    return useQuery({
        queryKey: ['location_id', location_id],
        queryFn: () => fetchLocationById(location_id),
        enabled: !!location_id, // Only fetch when location_id is set
    });
};