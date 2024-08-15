import { createSlice, configureStore } from '@reduxjs/toolkit';

const initialLocationState = { selectedLocation: '' };

const locationSlice = createSlice({
    name: 'location',
    initialState: initialLocationState,
    reducers: {
        updateLocation(state, action) {
            state.selectedLocation = action.payload;
        }
    }
});

// create the store
const store = configureStore({
    reducer: {
        location: locationSlice.reducer
    }
});

// export actions
export const locationActions = locationSlice.actions;

// export the store
export default store;