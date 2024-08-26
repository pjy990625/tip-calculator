import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

// const postTip = async (data) => {
//   const response = await axios.post('http://localhost:8000/api/tips', data);
//   return response.data;
// };

// export const usePostTip = () => {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: postTip,
//     onSuccess: () => {
//       // Invalidate and refetch any queries if needed
//       queryClient.invalidateQueries(['tips']);
//     },
//   });
// };
