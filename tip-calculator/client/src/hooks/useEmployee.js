import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// Axios function to fetch all servers
const fetchServers = async (branch_id) => {
    const response = await axios.get(`http://localhost:8000/api/${branch_id}/servers`, {
        params: { branch_id: branch_id } // Pass branch name as a parameter
    });

    return response.data;
};

// Axios function to fetch all kitchen staff
const fetchKitchenStaff = async (branch_id) => {
    const response = await axios.get(`http://localhost:8000/api/${branch_id}/kitchen-staff`);
    return response.data;
};

// Custom hook for fetching servers
export const useServers = (branch_id) => {
    return useQuery({
        queryKey: ['servers', branch_id],
        queryFn: () => fetchServers(branch_id),
        enabled: !!branch_id, // Only fetch when branch_id is set
    });
};

// Custom hook for fetching kitchen staff
export const useKitchenStaff = (location) => {
    return useQuery({
        queryKey: ['kitchenStaff', location],
        queryFn: () => fetchKitchenStaff(location),
        enabled: !!location, // Only fetch when location is set
    });
};
