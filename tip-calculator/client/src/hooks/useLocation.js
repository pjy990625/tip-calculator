import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Axios function to fetch all locations
const fetchAllLocations = async () => {
    const response = await axios.get(`http://localhost:8000/api/locations`);

    return response.data;
};

// Axios function to fetch the selected location
const fetchLocation = async (location_name) => {
    const response = await axios.get(`http://localhost:8000/api/locations/:location_id`, {
        params: { location_name: location_name } // Pass location name as a parameter
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
export const useBranch = (location_name) => {
    return useQuery({
        queryKey: ['location_name', location_name],
        queryFn: () => fetchLocation(),
        enabled: !!location_name, // Only fetch when location_name is set
    });
};