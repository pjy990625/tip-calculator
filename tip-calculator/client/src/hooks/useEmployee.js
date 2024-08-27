import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Axios function to fetch all servers in selected location
const fetchServers = async (location_id) => {
    // const response = await axios.get(`http://localhost:8000/api/${location_id}/servers`);
    const response = await axios.get(`http://localhost:8000/api/${location_id}/servers`, {
        params: { location_id: location_id } // Pass location_id as a parameter
    });

    return response.data;
};

// Axios function to fetch all kitchen staff in selected location
const fetchKitchenStaff = async (location_id) => {
    // const response = await axios.get(`http://localhost:8000/api/${location_id}/kitchen-staff`);
    const response = await axios.get(`http://localhost:8000/api/${location_id}/kitchen-staff`, {
        params: { location_id: location_id } // Pass location_id as a parameter
    });

    return response.data;
};

// Custom hook for fetching servers in selected location
export const useServers = (location_id) => {
    return useQuery({
        queryKey: ['servers', location_id],
        queryFn: () => fetchServers(location_id),
        enabled: !!location_id, // Only fetch when location_id is set
    });
};

// Custom hook for fetching kitchen staff in selected location
export const useKitchenStaff = (location_id) => {
    return useQuery({
        queryKey: ['kitchenStaff', location_id],
        queryFn: () => fetchKitchenStaff(location_id),
        enabled: !!location_id, // Only fetch when location_id is set
    });
};
